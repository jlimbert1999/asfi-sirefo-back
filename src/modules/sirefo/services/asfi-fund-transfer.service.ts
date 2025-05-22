import {
  Injectable,
  HttpException,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AsfiRequest, Prisma } from 'generated/prisma';

import { AsfiFundTransferWithFile } from 'src/modules/prisma/types';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { FilesService } from 'src/modules/files/files.service';

import { SirefoService } from './sirefo.service';
import {
  CreateAsfiFundTransferDto,
  FilterAsfiRequestDto,
  ItemFundTransferDto,
  UpdateAsfiFundTransferDto,
} from '../dtos';

@Injectable()
export class AsfiFundTransferService {
  constructor(
    private prisma: PrismaService,
    private sirefoService: SirefoService,
    private fileService: FilesService,
  ) {}

  async create(requestDto: CreateAsfiFundTransferDto) {
    console.log(requestDto);
    try {
      // await this.checkTransferCodes(data.details);

      await this.checkDuplicateRequestCode(requestDto.requestCode);

      const { asfiRequestId, details, ...dtoProps } = requestDto;

      const asfiRequest = await this.getValidatedAsfiRequest(asfiRequestId);

      const currentDate = new Date();

      const createdRequest = await this.prisma.asfiFundTransfer.create({
        data: {
          ...dtoProps,
          quantityDetail: details.length,
          sentDate: currentDate,
          userName: 'luiz.perez',
          asfiRequest: {
            connect: {
              id: asfiRequest.id,
            },
          },
          file: {
            create: {
              fileName: dtoProps.file.fileName,
              originalName: dtoProps.file.originalName,
            },
          },
        },
        include: { file: true, asfiRequest: true },
      });

      // await this.sendAsfiRequest(createdRequest, data.details);

      // const updated = await this.prisma.asfiFundTransfer.update({
      //   where: { id: createdRequest.id },
      //   data: { status: 'completed' },
      //   include: { file: true, asfiRequest: true },
      // });
      return this.plainAsfiFundRequest(createdRequest);
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, { file, details, asfiRequestId, ...dtoProps }: UpdateAsfiFundTransferDto) {
    try {
      await this.checkTransferCodes(details);

      const requestDB = await this.prisma.asfiFundTransfer.findUnique({ where: { id }, include: { file: true } });
      if (!requestDB) throw new NotFoundException(`Request ${id} not found`);

      if (requestDB.status !== 'pending') {
        throw new BadRequestException(`Request must be pending status for update`);
      }

      if (dtoProps.requestCode && dtoProps.requestCode !== requestDB.requestCode) {
        await this.checkDuplicateRequestCode(dtoProps.requestCode);
      }

      const updateAsfiRequestQuery =
        asfiRequestId && asfiRequestId !== requestDB.asfiRequestId
          ? { asfiRequest: { connect: { id: (await this.getValidatedAsfiRequest(asfiRequestId)).id } } }
          : {};

      const result = await this.prisma.$transaction(async (tx) => {
        let createFileQuery: Prisma.AsfiFundTransferUpdateInput = {};
        if (file && requestDB.file.fileName !== file.fileName) {
          await tx.asfiTransferFile.deleteMany({ where: { asfiFundTransferId: id } });
          createFileQuery = {
            file: {
              create: {
                fileName: file.fileName,
                originalName: file.originalName,
              },
            },
          };
        }
        const updatedRequest = await tx.asfiFundTransfer.update({
          where: { id },
          include: { file: true, asfiRequest: true },
          data: { ...dtoProps, ...createFileQuery, ...updateAsfiRequestQuery },
        });
        return updatedRequest;
      });

      await this.sendAsfiRequest(result, details);

      const updatedRequest = await this.prisma.asfiFundTransfer.update({
        where: { id: result.id },
        data: { status: 'completed' },
        include: { file: true, asfiRequest: true },
      });
      return this.plainAsfiFundRequest(updatedRequest);
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException();
    }
  }

  async findAll({ limit, offset, term, createdAt, processType, status, isAproved }: FilterAsfiRequestDto) {
    const where: Prisma.AsfiFundTransferWhereInput = {
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
      this.prisma.asfiFundTransfer.findMany({
        where,
        include: {
          file: true,
          asfiRequest: true,
        },
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.asfiFundTransfer.count({ where }),
    ]);
    return {
      requests: requests.map((request) => this.plainAsfiFundRequest(request)),
      length,
    };
  }

  private async checkTransferCodes(items: ItemFundTransferDto[]) {
    const entities = await this.sirefoService.consultarEntidadVigente();
    const validCodes = new Set(entities.map((e) => e.CodigoEnvio));

    const invaliCodes = items
      .filter((item) => !validCodes.has(item.transferCode.toUpperCase()))
      .map(({ transferCode }) => transferCode);

    if (invaliCodes.length > 0) {
      throw new BadRequestException(`Códigos de envío inválidos: ${[...new Set(invaliCodes)].join(', ')}`);
    }
  }

  private async checkDuplicateRequestCode(code: string): Promise<void> {
    const duplicate = await this.prisma.asfiFundTransfer.findFirst({ where: { requestCode: code } });
    if (duplicate) throw new BadRequestException(`El codigo ${code} ya ha sido registrado`);
  }

  private async getValidatedAsfiRequest(id: string): Promise<AsfiRequest> {
    const asfiRequest = await this.prisma.asfiRequest.findFirst({ where: { id } });
    if (!asfiRequest) {
      throw new NotFoundException(`Request ${id} not found`);
    }

    if (!asfiRequest.circularNumber) {
      throw new BadRequestException(`La solicitud ${asfiRequest.requestCode} no tiene un número de circular`);
    }

    return asfiRequest;
  }

  private async sendAsfiRequest(request: AsfiFundTransferWithFile, details: ItemFundTransferDto[]) {
    const response = await this.sirefoService.remitirRemisionFondos(request, details);

    if (response.Respuesta !== 0) {
      throw new ConflictException({ message: response.Detalle, request: this.plainAsfiFundRequest(request) });
    }
  }

  private plainAsfiFundRequest(request: AsfiFundTransferWithFile) {
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
