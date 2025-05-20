import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/modules/users/domain';
import { RoleGuard } from '../guards';

export const META_ROLE = 'roles';
export function Role(resource: UserRole) {
  return applyDecorators(SetMetadata(META_ROLE, resource), UseGuards(RoleGuard));
}
