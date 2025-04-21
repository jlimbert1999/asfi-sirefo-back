import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  async ping() {
    return await this.appService.ping('HolaMnduo');
  }

  @Get('consultarEntidadVigente')
  async consultarEntidadVigente() {
    return await this.appService.consultaEntidadVigenteSoap12();
  }
}
