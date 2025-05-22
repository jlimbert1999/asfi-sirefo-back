import {
  Injectable,
  HttpException,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Prisma } from 'generated/prisma';

import { SirefoService } from './sirefo.service';
import { CreateAsfiRequestDto, FilterAsfiRequestDto, ItemRequestDto, UpdateAsfiRequestDto } from '../dtos';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { FilesService } from 'src/modules/files/files.service';
import { AsfiRequestWithFile } from 'src/modules/prisma/types';
import { IAsfiCredentials } from '../infrastructure';

@Injectable()
export class AsfiRequestService {
  constructor(
    private prisma: PrismaService,
    private sirefoService: SirefoService,
    private fileService: FilesService,
  ) {}

  async create(requestDto: CreateAsfiRequestDto, credentials: IAsfiCredentials) {
    try {
      await this.checkDuplicateRequestCode(requestDto.requestCode);
      const currentDate = new Date();
      const { details, file, ...props } = requestDto;
      const createdRequest = await this.prisma.asfiRequest.create({
        data: {
          ...props,
          quantityDetail: details.length,
          sentDate: currentDate,
          userName: 'luiz.perez',
          file: {
            create: {
              fileName: file.fileName,
              originalName: file.originalName,
            },
          },
        },
        include: { file: true },
      });

      // await this.sendAsfiRequest(createdRequest, dto.details, credentials);

      const updated = await this.prisma.asfiRequest.update({
        where: { id: createdRequest.id },
        data: { status: 'completed' },
        include: { file: true },
      });
      return this.plainAsfiRequest(updated);
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, { file, details, ...dtoProps }: UpdateAsfiRequestDto, credentials: IAsfiCredentials) {
    try {
      const requesDB = await this.prisma.asfiRequest.findUnique({ where: { id }, include: { file: true } });
      if (!requesDB) throw new NotFoundException(`Request ${id} not found`);

      if (requesDB.status !== 'pending') {
        throw new BadRequestException(`Request must be pending status for update`);
      }

      if (dtoProps.requestCode && dtoProps.requestCode !== requesDB.requestCode) {
        await this.checkDuplicateRequestCode(dtoProps.requestCode);
      }

      const result = await this.prisma.$transaction(async (tx) => {
        let createFileQuery: Prisma.AsfiRequestUpdateInput = {};
        if (file && requesDB.file.fileName !== file.fileName) {
          createFileQuery = {
            file: {
              create: {
                fileName: file.fileName,
                originalName: file.originalName,
              },
            },
          };
          await tx.asfiRequestFile.deleteMany({ where: { asfiRequestId: id } });
        }
        const updatedRequest = await tx.asfiRequest.update({
          where: { id },
          include: { file: true },
          data: { ...dtoProps, ...createFileQuery },
        });
        return updatedRequest;
      });

      // await this.sendAsfiRequest(result, details, credentials);

      const updated = await this.prisma.asfiRequest.update({
        where: { id: result.id },
        data: { status: 'completed' },
        include: { file: true },
      });
      return this.plainAsfiRequest(result);
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async findAll({ limit, offset, term, createdAt, processType, status, isAproved }: FilterAsfiRequestDto) {
    const where: Prisma.AsfiRequestWhereInput = {
      ...(term && {
        requestCode: {
          contains: term,
          mode: 'insensitive',
        },
      }),
      ...(createdAt && {
        createdAt: {
          gte: new Date(createdAt.setHours(0, 0, 0, 0)),
          lt: new Date(createdAt.setHours(23, 59, 59, 999)),
        },
      }),
      ...(processType && { processType }),
      ...(status && { status }),
      ...(typeof isAproved === 'boolean' && { circularNumber: isAproved ? { not: null } : null }),
    };
    const [requests, length] = await Promise.all([
      this.prisma.asfiRequest.findMany({
        where,
        skip: offset,
        take: limit,
        include: { file: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.asfiRequest.count({ where }),
    ]);
    return {
      requests: requests.map((request) => this.plainAsfiRequest(request)),
      length,
    };
  }

  async searchAprovedCodes(term?: string) {
    const item = await this.prisma.asfiRequest.findMany({
      where: {
        status: 'completed',
        circularNumber: { not: null },
        processType: 'R',
        ...(term && { requestCode: { contains: term, mode: 'insensitive' } }),
      },
      select: { id: true, circularNumber: true, requestCode: true, quantityDetail: true },
      // take: 5,
    });
    return item;
  }

  private async checkDuplicateRequestCode(code: string): Promise<void> {
    const duplicate = await this.prisma.asfiRequest.findFirst({ where: { requestCode: code } });
    if (duplicate) throw new BadRequestException(`El codigo ${code} ya ha sido registrado`);
  }

  private async sendAsfiRequest(
    request: AsfiRequestWithFile,
    details: ItemRequestDto[],
    credentials: IAsfiCredentials,
  ) {
    const response = await this.sirefoService.remitirSolicitud(request, details, credentials);

    if (response.Respuesta !== 0) {
      throw new ConflictException({ message: response.Detalle, request: this.plainAsfiRequest(request) });
    }
  }

  private plainAsfiRequest(request: AsfiRequestWithFile) {
    const { file, dataSheetFile, ...props } = request;
    return {
      ...props,
      dataSheetFile: this.fileService.buildFileUrl(dataSheetFile),
      file: {
        originalName: file.originalName,
        fileName: this.fileService.buildFileUrl(file.fileName),
      },
    };
  }
}
