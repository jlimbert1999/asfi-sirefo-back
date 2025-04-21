import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SoapModule } from 'nestjs-soap';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    SoapModule.register({
      clientName: 'SirefoClient',
      uri: 'https://srvservicios.asfi.gob.bo/retencionesDev/ServicioRetencionFondos.svc?wsdl',
      clientOptions: {
        // forceSoap12Headers: false,
        // overrideRootElement: {
        //   namespace: 's',
        //   xmlnsAttributes: [
        //     {
        //       name: 'xmlns:s',
        //       value: 'http://www.w3.org/2003/05/soap-envelope',
        //     },
        //   ],
        // },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
