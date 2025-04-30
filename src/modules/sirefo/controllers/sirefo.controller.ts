import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PingDto, RemitirSolicitudDto } from '../dtos';
import { SirefoService } from '../services/sirefo.service';

@Controller()
export class SirefoController {
  constructor(private readonly sirefoService: SirefoService) {}

  @Post('ping')
  ping(@Body() pingDto: PingDto) {
    return this.sirefoService.ping(pingDto);
  }

  @Post('remitirSolicitud')
  remitirSolicitud(@Body() body: RemitirSolicitudDto) {
    return this.sirefoService.remitirSolicitud(body);
  }

  @Get('consultarEntidadVigente')
  async consultarEntidadVigente() {
    return await this.sirefoService.consultarEntidadVigente();
  }

  @Get('consultarListaEstadoEnvio')
  async consultarListaEstadoEnvio() {
    return await this.sirefoService.consultarListaEstadoEnvio();
  }

  @Get('consultarEstadoEnvio/:id')
  consultarEstadoEvio(@Param('id') id: string) {
    return this.sirefoService.consultarEstadoEvio(id);
  }

  @Get('consultarCabecera')
  consultarCabacera() {
    return this.sirefoService.consultarCabecera();
  }

  @Get('remitirRemisionFondos')
  consultarEstadoEnvio() {
    return this.sirefoService.remitirRemisionFondos();
  }


  @Get('remitirConfirmacionRequest')
  remitirConfirmacionRequest() {
    return this.sirefoService.remitirConfirmacionRequest();
  }
}
