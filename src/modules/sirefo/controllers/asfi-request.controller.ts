import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserRole } from 'src/modules/users/domain';
import { Role } from 'src/modules/auth/decorators';

import { CreateAsfiRequestDto, FilterAsfiRequestDto, UpdateAsfiRequestDto } from '../dtos';
import { AsfiCredentials, GetAsfiCredentialsRequest } from '../decorators';
import { IAsfiCredentials } from '../infrastructure';
import { AsfiRequestService } from '../services';

@Role(UserRole.EMPLOYEE)
@Controller('asfi-request')
export class AsfiRequestController {
  constructor(private requestService: AsfiRequestService) {}

  @Post()
  @AsfiCredentials()
  create(@Body() body: CreateAsfiRequestDto, @GetAsfiCredentialsRequest() credentials: IAsfiCredentials) {
    return this.requestService.create(body, credentials);
  }

  @Patch(':id')
  @AsfiCredentials()
  update(
    @Param('id') id: string,
    @Body() body: UpdateAsfiRequestDto,
    @GetAsfiCredentialsRequest() credentials: IAsfiCredentials,
  ) {
    return this.requestService.update(id, body, credentials);
  }

  @Get()
  findAll(@Query() queryParams: FilterAsfiRequestDto) {
    return this.requestService.findAll(queryParams);
  }

  @Get('aproved')
  serchAprovedCodes(@Query('term') term: string) {
    return this.requestService.searchAprovedCodes(term);
  }
}
