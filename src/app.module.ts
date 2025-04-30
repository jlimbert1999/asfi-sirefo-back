import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { validate } from './config';
import { SirefoModule } from './modules/sirefo/sirefo.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    SirefoModule,
    PrismaModule,
    FilesModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
