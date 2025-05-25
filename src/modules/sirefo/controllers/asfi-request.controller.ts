import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserRole } from 'src/modules/users/domain';
import { GetUserRequest, Role } from 'src/modules/auth/decorators';

import { CreateAsfiRequestDto, FilterAsfiRequestDto, UpdateAsfiRequestDto } from '../dtos';
import { AsfiCredentials, GetAsfiCredentialsRequest } from '../decorators';
import { IAsfiCredentials } from '../infrastructure';
import { AsfiRequestService } from '../services';
import { User } from 'generated/prisma';

@Role(UserRole.EMPLOYEE)
@AsfiCredentials()
@Controller('asfi-request')
export class AsfiRequestController {
  constructor(private requestService: AsfiRequestService) {}

  @Post()
  create(
    @Body() body: CreateAsfiRequestDto,
    @GetUserRequest() user: User,
    @GetAsfiCredentialsRequest() credentials: IAsfiCredentials,
  ) {
    return this.requestService.create(body, user, credentials);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateAsfiRequestDto,
    @GetAsfiCredentialsRequest() credentials: IAsfiCredentials,
  ) {
    return this.requestService.update(id, body, credentials);
  }

  @Get()
  findAll(@Query() queryParams: FilterAsfiRequestDto, @GetUserRequest() user: User) {
    return this.requestService.findAll(queryParams, user);
  }

  @Get('aproved')
  serchAprovedCodes(@Query('term') term?: string) {
    return this.requestService.searchAprovedCodes(term);
  }
}
