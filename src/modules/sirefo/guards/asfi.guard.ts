import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CryptoService } from '../services';

@Injectable()
export class AsfiGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request['user'];
    if (!user) {
      throw new InternalServerErrorException('User is not authenticated');
    }

    const asfiCrendentials = await this.prisma.asfiCredentials.findFirst({ where: { userId: user.id } });

    if (!asfiCrendentials) throw new ForbiddenException(`Required asfi credentials`);

    const { asfiPassword, asfiUsername, passwordIv } = asfiCrendentials;

    const decryptedPassword = this.cryptoService.decrypt(asfiPassword, passwordIv);

    request['asfiCredentials'] = {
      email: asfiUsername,
      password: decryptedPassword,
    };
    return true;
  }
}
