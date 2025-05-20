import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { JwtPayload } from '../interfaces';
import { User } from 'generated/prisma';
import { EnvVars } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    configService: ConfigService<EnvVars>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_KEY'),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { id: payload.userId } });
    if (!user) throw new UnauthorizedException();
    if (!user.active) throw new UnauthorizedException('user is not active');
    return user;
  }
}
