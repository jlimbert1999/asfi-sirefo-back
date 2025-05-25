import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { CryptoService, SirefoService } from '../sirefo/services';
import { PrismaService } from '../prisma/prisma.service';
import { AsfiRequest } from 'generated/prisma';
import { AnsiDateUtil } from 'src/helpers';
@Injectable()
export class SchedulerService {
  constructor(
    private sirefoService: SirefoService,
    private cryptoService: CryptoService,
    private prisma: PrismaService,
  ) {}

  @Cron('30 11,15 * * *')
  // @Cron('*/30 * * * * *')
  async syncCircularNumbersFromASFI() {
    const pendingRequests = await this.prisma.asfiRequest.findMany({ where: { status: 'sent' } });
    const credentialsMap = await this.getUsersCredentialsMap(pendingRequests);

    for (const request of pendingRequests) {
      const { asfiPassword, asfiUsername, passwordIv } = credentialsMap.get(request.userId);
      const decryptedPassword = this.cryptoService.decrypt(asfiPassword, passwordIv);

      const stateRequest = await this.sirefoService.consultarEstadoEvio(
        {
          id: request.requestId,
          type: request.processType === 'R' ? 1 : 2,
        },
        { email: asfiUsername, password: decryptedPassword },
      );
      let newStatus = request.status;
      switch (stateRequest.Estado) {
        case 'Procesado':
          newStatus = 'accepted';
          break;

        case 'Con error':
          newStatus = 'rejected';
          break;

        default:
          break;
      }
      await this.prisma.asfiRequest.update({
        where: { id: request.id },
        data: {
          status: newStatus,
          circularNumber: stateRequest.Circular,
          sendErrorMessage: stateRequest.ErrorEnvio,
          processingStatus: stateRequest.Estado,
          circularDate: AnsiDateUtil.parseFromAnsi(stateRequest.FechaCircular),
        },
      });
    }
  }

  async getUsersCredentialsMap(request: AsfiRequest[]) {
    const uniqueUserIds = [...new Set(request.map((item) => item.userId))];
    const credentialsList = await this.prisma.asfiCredentials.findMany({
      where: {
        userId: { in: uniqueUserIds },
      },
    });
    return new Map(credentialsList.map((cred) => [cred.userId, cred]));
  }
}
