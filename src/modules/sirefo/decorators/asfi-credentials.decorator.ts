import { applyDecorators, UseGuards } from '@nestjs/common';
import { AsfiGuard } from '../guards/asfi.guard';

export function AsfiCredentials() {
  return applyDecorators(UseGuards(AsfiGuard));
}
