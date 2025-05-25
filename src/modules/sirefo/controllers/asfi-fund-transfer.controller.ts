import { Body, Controller, Post, Get, Query, Patch, Param } from '@nestjs/common';

import { GetUserRequest, Role } from 'src/modules/auth/decorators';
import { UserRole } from 'src/modules/users/domain';

import { CreateAsfiFundTransferDto, FilterAsfiRequestDto, UpdateAsfiFundTransferDto } from '../dtos';
import { AsfiFundTransferService } from '../services';
import { AsfiCredentials } from '../decorators';
import { User } from 'generated/prisma';

@Role(UserRole.EMPLOYEE)
@AsfiCredentials()
@Controller('asfi-fund-transfer')
export class AsfiFundTransferController {
  constructor(private requestService: AsfiFundTransferService) {}

  @Post()
  create(@Body() body: CreateAsfiFundTransferDto, @GetUserRequest() user: User) {
    return this.requestService.create(body, user);
  }

  @Get()
  findAll(@Query() queryParams: FilterAsfiRequestDto, @GetUserRequest() user: User) {
    return this.requestService.findAll(queryParams, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateAsfiFundTransferDto) {
    return this.requestService.update(id, body);
  }
}
