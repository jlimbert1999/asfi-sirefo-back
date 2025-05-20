import { Body, Controller, Post, Get, Query, Patch, Param } from '@nestjs/common';

import { AsfiFundTransferService } from '../services';
import { CreateAsfiFundTransferDto, FilterAsfiRequestDto, UpdateAsfiFundTransferDto } from '../dtos';
import { Role } from 'src/modules/auth/decorators';
import { UserRole } from 'src/modules/users/domain';
import { AsfiCredentials } from '../decorators';

@Role(UserRole.EMPLOYEE)
@AsfiCredentials()
@Controller('asfi-fund-transfer')
export class AsfiFundTransferController {
  constructor(private requestService: AsfiFundTransferService) {}

  @Post()
  create(@Body() body: CreateAsfiFundTransferDto) {
    return this.requestService.create(body);
  }

  @Get()
  findAll(@Query() queryParams: FilterAsfiRequestDto) {
    return this.requestService.findAll(queryParams);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateAsfiFundTransferDto) {
    return this.requestService.update(id, body);
  }
}
