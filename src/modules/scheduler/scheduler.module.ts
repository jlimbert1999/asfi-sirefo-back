import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SirefoModule } from '../sirefo/sirefo.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [SchedulerService],
  imports: [SirefoModule, PrismaModule],
})
export class SchedulerModule {}
