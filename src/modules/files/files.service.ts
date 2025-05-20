import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { writeFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { existsSync } from 'fs';
import { join } from 'path';

import { EnvVars } from 'src/config';

export interface savedFile {
  fileName: string;
  originalName: string;
}

@Injectable()
export class FilesService {
  constructor(private configService: ConfigService<EnvVars>) {}

  async saveFile(file: Express.Multer.File): Promise<savedFile> {
    const fileExtension = file.mimetype.split('/')[1];
    const savedFileName = `${uuid()}.${fileExtension}`;
    const path = join(__dirname, '..', '..', '..', 'static', 'uploads', savedFileName);
    try {
      await writeFile(path, file.buffer);
      const decodedOriginalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
      return { fileName: savedFileName, originalName: decodedOriginalName };
    } catch (error) {
      throw new InternalServerErrorException('Error saving file');
    }
  }

  getStaticFilePath(filename: string) {
    const extension = filename.split('.')[1];
    if (!extension) throw new BadRequestException('File extension not found');
    const path = join(__dirname, '..', '..', '..', 'static', 'uploads', filename);
    if (!existsSync(path)) {
      throw new BadRequestException(`No file found with ${filename}`);
    }
    return path;
  }

  public buildFileUrl(filename: string): string {
    const host = this.configService.get('HOST');
    return `${host}/files/${filename}`;
  }
}
