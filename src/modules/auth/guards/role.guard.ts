import { Injectable, CanActivate, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRole } from 'src/modules/users/domain';
import { User } from 'generated/prisma';

import { META_ROLE } from '../decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRole: UserRole | undefined = this.reflector.get(META_ROLE, context.getHandler());
    if (!requiredRole) return true;

    const req = context.switchToHttp().getRequest();
    const user: User = req['user'];

    if (!user) throw new InternalServerErrorException('ReportGuard error, no user in request');

    return user.roles.some((resource) => resource === requiredRole);
  }
}
