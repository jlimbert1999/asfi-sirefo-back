import { Module } from '@nestjs/common';

import { FilesModule } from '../files/files.module';
import { PrismaModule } from '../prisma/prisma.module';

import {
  AsfiCrendentialsService,
  AsfiFundTransferService,
  AsfiRequestService,
  CryptoService,
  SirefoService,
  XmlService,
} from './services';

import {
  AsfiCrendentialsController,
  AsfiFundTransferController,
  AsfiRequestController,
  SirefoController,
} from './controllers';

@Module({
  controllers: [SirefoController, AsfiRequestController, AsfiFundTransferController, AsfiCrendentialsController],
  providers: [
    SirefoService,
    XmlService,
    AsfiRequestService,
    AsfiFundTransferService,
    CryptoService,
    AsfiCrendentialsService,
  ],
  imports: [FilesModule, PrismaModule],
  exports: [SirefoService, AsfiRequestService],
})
export class SirefoModule {}
