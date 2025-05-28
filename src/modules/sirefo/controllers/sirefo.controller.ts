import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { ConsultRequestDto, FilterAsfiRequestList, PingDto } from '../dtos';
import { AsfiCredentials, GetAsfiCredentialsRequest } from '../decorators';
import { SirefoService } from '../services';
import { IAsfiCredentials } from '../infrastructure';

import { UserRole } from 'src/modules/users/domain';
import { Role } from 'src/modules/auth/decorators';

@Role(UserRole.EMPLOYEE)
@Controller('sirefo')
export class SirefoController {
  constructor(private sirefoService: SirefoService) {}

  @Post('ping')
  ping(@Body() pingDto: PingDto) {
    return this.sirefoService.ping(pingDto);
  }

  @Get('consultarEntidadVigente')
  @AsfiCredentials()
  consultarEntidadVigente(@GetAsfiCredentialsRequest() credentials: IAsfiCredentials) {
    return this.sirefoService.consultarEntidadVigente(credentials);
  }

  @Get('consultarListaEstadoEnvio')
  @AsfiCredentials()
  consultarListaEstadoEnvio(
    @GetAsfiCredentialsRequest() credentials: IAsfiCredentials,
    @Query() queryParams: FilterAsfiRequestList,
  ) {
    return this.sirefoService.consultarListaEstadoEnvio(credentials, queryParams);
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
