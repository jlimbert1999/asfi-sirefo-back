import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { writeFile, mkdir } from 'fs/promises';
import { getFileType } from 'src/helpers';
import { EnvVars } from 'src/config';
import { v4 as uuid } from 'uuid';
import { existsSync } from 'fs';
import { extname, join } from 'path';

export interface savedFile {
  fileName: string;
  originalName: string;
}

@Injectable()
export class FilesService {
  private readonly baseUploadPath = join(__dirname, '..', '..', '..', 'static', 'uploads');

  constructor(private configService: ConfigService<EnvVars>) {}

  async saveFile(file: Express.Multer.File): Promise<savedFile> {
    const fileType = await getFileType(file.buffer);
    if (!fileType) throw new InternalServerErrorException('Cannot determine file type');

    const subfolder = this.getSubfolder(fileType.ext);
    const folderPath = join(this.baseUploadPath, subfolder);

    await this.ensureFolderExists(folderPath);

    const savedFileName = `${uuid()}.${fileType.ext}`;
    const filePath = join(folderPath, savedFileName);

    try {
      await writeFile(filePath, file.buffer);
      const decodedOriginalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
      return {
        fileName: savedFileName,
        originalName: decodedOriginalName,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error saving file');
    }
  }

  getStaticFilePath(filename: string): string {
    const extension = extname(filename).replace('.', '');
    const folderName = this.getSubfolder(extension);
    const filePath = join(this.baseUploadPath, folderName, filename);

    if (!existsSync(filePath)) {
      throw new BadRequestException(`No file found with name ${filename}`);
    }

    return filePath;
  }

  buildFileUrl(filename: string): string {
    const host = this.configService.get('HOST');
    return `${host}/files/${filename}`;
  }

  private getSubfolder(extension: string): string {
    if (extension === 'pdf') return 'pdf';
    if (['xlsx', 'ods'].includes(extension)) return 'spreadsheets';
    return 'others';
  }

  private async ensureFolderExists(path: string): Promise<void> {
    if (!existsSync(path)) {
      await mkdir(path, { recursive: true });
    }
  }
}
