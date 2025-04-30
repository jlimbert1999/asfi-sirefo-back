import { Module } from '@nestjs/common';
import { SirefoController } from './controllers/sirefo.controller';
import { SirefoService, XmlService } from './services';
import { RequestService } from './services/request.service';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [SirefoController],
  providers: [SirefoService, XmlService, RequestService],
  imports: [FilesModule],
})
export class SirefoModule {}
