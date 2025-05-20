import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SirefoModule } from './modules/sirefo/sirefo.module';
import { FilesModule } from './modules/files/files.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import { AppService } from './app.service';
import { validate } from './config';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ validate, isGlobal: true }),
    SirefoModule,
    PrismaModule,
    FilesModule,
    UsersModule,
    SchedulerModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
