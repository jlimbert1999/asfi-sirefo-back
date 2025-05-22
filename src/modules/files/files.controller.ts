import { Controller, Get, Param, ParseFilePipeBuilder, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { FilesService } from './files.service';
import { CustomUploadFileTypeValidator } from './validators/upload-file-type.validator';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('asfi')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileASFI(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(new CustomUploadFileTypeValidator(['pdf', 'xlsx', 'ods']))
        .addMaxSizeValidator({ maxSize: 20 * 1000000 })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.saveFile(file);
  }

  @Get(':filename')
  findBranchVideo(@Res() res: Response, @Param('filename') filename: string) {
    const path = this.filesService.getStaticFilePath(filename);
    res.sendFile(path);
  }
}
