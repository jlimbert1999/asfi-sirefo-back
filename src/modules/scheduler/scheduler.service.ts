import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { SirefoService } from '../sirefo/services';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from 'src/config';

@Injectable()
export class SchedulerService {
  constructor(
    private sirefoService: SirefoService,
    private prisma: PrismaService,
    private configService: ConfigService<EnvVars>,
  ) {}

  @Cron('30 11,15 * * *')
  // @Cron('*/30 * * * * *')
  async syncCircularNumbersFromASFI() {
    const pendingRequests = await this.getPendingApprovalRequests();
    for (const request of pendingRequests) {
      const stateRequest = await this.sirefoService.consultarEstadoEvio(
        {
          id: request.requestId,
          type: request.processType === 'R' ? 1 : 2,
        },
        { email: this.configService.get('ASFI_USER'), password: this.configService.get('ASFI_PASSWORD') },
      );
      if (stateRequest.Circular) {
        await this.prisma.asfiRequest.update({
          where: { id: request.id },
          data: { circularNumber: stateRequest.Circular },
        });
      }
    }
  }

  private async getPendingApprovalRequests() {
    return await this.prisma.asfiRequest.findMany({ where: {} });
  }
}
