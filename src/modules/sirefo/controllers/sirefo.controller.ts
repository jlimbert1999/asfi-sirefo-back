import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { ConsultRequestDto, PingDto, FilterAsfiRequestDto } from '../dtos';
import { AsfiCredentials, GetAsfiCredentialsRequest } from '../decorators';
import { AsfiRequestService, SirefoService } from '../services';
import { IAsfiCredentials } from '../infrastructure';

import { UserRole } from 'src/modules/users/domain';
import { Role } from 'src/modules/auth/decorators';
@Role(UserRole.EMPLOYEE)
@Controller()
export class SirefoController {
  constructor(
    private sirefoService: SirefoService,
    private requestService: AsfiRequestService,
  ) {}

  @Post('ping')
  ping(@Body() pingDto: PingDto) {
    return this.sirefoService.ping(pingDto);
  }

  @Get('requests')
  findAll(@Query() queryParams: FilterAsfiRequestDto) {
    return this.requestService.findAll(queryParams);
  }

  @Get('consultarEntidadVigente')
  async consultarEntidadVigente() {
    return await this.sirefoService.consultarEntidadVigente();
  }

  @Get('consultarListaEstadoEnvio')
  @AsfiCredentials()
  consultarListaEstadoEnvio(@GetAsfiCredentialsRequest() credentials: IAsfiCredentials) {
    return this.sirefoService.consultarListaEstadoEnvio(credentials);
  }

  @Get('consultarEstadoEnvio/:id/:type')
  @AsfiCredentials()
  consultarEstadoEvio(
    @Param() params: ConsultRequestDto,
    @GetAsfiCredentialsRequest() asfiCredentials: IAsfiCredentials,
  ) {
    return this.sirefoService.consultarEstadoEvio(params, asfiCredentials);
  }

  @Get('consultarCabecera')
  @AsfiCredentials()
  consultarCabacera(@GetAsfiCredentialsRequest() credentials: IAsfiCredentials) {
    return this.sirefoService.consultarCabecera(credentials);
  }
}
