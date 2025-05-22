import { FileValidator } from '@nestjs/common';
import { getFileType } from 'src/helpers';

export class CustomUploadFileTypeValidator extends FileValidator {
  constructor(protected readonly validExtensions: string[]) {
    super(validExtensions);
  }

  async isValid(file?: Express.Multer.File): Promise<boolean> {
    if (!file || !file.buffer) return false;
    const fileType = await getFileType(file.buffer);
    if (!fileType) return false;
    if (file.mimetype !== fileType.mime) return false;
    return this.validExtensions.includes(fileType.ext);
  }

  buildErrorMessage(file: Express.Multer.File): string {
    const current = file?.mimetype?.split('/')[1] ?? 'unknown';
    return `${current} is not valid. Only files allowed: ${this.validExtensions.join(', ')}`;
  }
}
