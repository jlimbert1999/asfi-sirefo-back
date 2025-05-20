import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetAsfiCredentialsRequest = createParamDecorator((propertyPath: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const credentials = req['asfiCredentials'];
  if (!credentials) throw new InternalServerErrorException('Asfi credentials not found in request');
  return !propertyPath ? credentials : credentials[propertyPath];
});
