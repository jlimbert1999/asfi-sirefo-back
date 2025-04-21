import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as soap from 'soap';
import { AxiosRequestConfig } from 'axios';
import { XMLBuilder } from 'fast-xml-parser';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('SirefoClient') private client: soap.Client,
    private configService: ConfigService,
  ) {
    this.client.on('request', (xml) => {
      console.log('XML enviado:', xml);
    });
  }
  private readonly WSDL_URL =
    'https://srvservicios.asfi.gob.bo/retencionesDev/ServicioRetencionFondos.svc?wsdl'; // ¡Ahora con minúsculas!
  private readonly SOAP11_ENDPOINT =
    'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc/Soap';
  private readonly SOAP12_ENDPOINT =
    'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc/Soap12';

  async ping(entrada: string) {
    return await this.pingNest();
  }

  async pingNest() {
    try {
      const builder = new XMLBuilder();
      const xmlContent = builder.build({
        'i0:Ping': { 'i0:entrada': 'Ejemplo de texto' },
      });
      const config: AxiosRequestConfig = {
        method: 'POST',
        url: this.SOAP11_ENDPOINT,
      };
      const result = await this.client.PingAsync({ _xml: xmlContent }, config);
      return result[0]['PingResult'];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async consultarEntidadVigente() {
    const builder = new XMLBuilder();
    const xmlContent = builder.build({
      'i0:ConsultaEntidadVigenteRequest': {
        'i0:Identidad': {
          'q1:Usuario': this.configService.get('ASFI_USER'),
          'q1:Clave': this.configService.get('ASFI_PASSWORD'),
        },
      },
    });
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: this.SOAP11_ENDPOINT,
    };
    const result = await this.client.ConsultaEntidadVigenteAsync(
      {
        Usuario: this.configService.get('ASFI_USER'),
        Clave: this.configService.get('ASFI_PASSWORD'),
      },
      config,
    );
    const [rawXml] = result; // Esto es un string XML completo
    console.log(rawXml);
  }

  async consultaEntidadVigenteSoap12() {
    const usuario = 'luis.perez@sacaba.gob.bo'; // o desde configService
    const clave = 'Aiquile1*';

    const client = await soap.createClientAsync(this.WSDL_URL, {
      endpoint: this.SOAP12_ENDPOINT,
      escapeXML: false,
      forceSoap12Headers: true,
      envelopeKey: 'soap12',
      useEmptyTag: true,
      ignoreBaseNameSpaces: true,
    });

    // Headers WS-Addressing
    const headerOptions = {
      'wsa:To': {
        attributes: {
          'xmlns:wsa': 'http://www.w3.org/2005/08/addressing',
        },
        $value: this.SOAP12_ENDPOINT,
      },
      'wsa:Action': {
        attributes: {
          'xmlns:wsa': 'http://www.w3.org/2005/08/addressing',
        },
        $value:
          'https://srvservicios.asfi.gob.bo/RetencionesDev/IRetencionFondos/ConsultaEntidadVigente',
      },
    };

    client.addSoapHeader(headerOptions);

    client.on('request', (xml) => {
      console.log('🛰️ XML enviado:\n', xml);
    });

    const args = {
      _xml: `
        <i0:ConsultaEntidadVigenteRequest xmlns:i0="https://srvservicios.asfi.gob.bo/RetencionesDev/">
          <i0:Identidad>
            <q1:Usuario xmlns:q1="urn:ASFI:2014:Marzo:25">${usuario}</q1:Usuario>
            <q1:Clave xmlns:q1="urn:ASFI:2014:Marzo:25">${clave}</q1:Clave>
          </i0:Identidad>
        </i0:ConsultaEntidadVigenteRequest>
      `,
    };

    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
    };

    try {
      const [result] = await client.ConsultaEntidadVigenteAsync(
        args,
        requestConfig,
      );
      console.log('✅ Respuesta:', result);
      return result;
    } catch (error) {
      console.error('❌ Error:', error);
      throw new InternalServerErrorException('Falló la consulta a ASFI');
    }
  }

  // private async pingSoap(input: string) {
  //   try {
  //     const client = await soap.createClientAsync(this.WSDL_URL, {
  //       endpoint: this.SOAP11_ENDPOINT,
  //       escapeXML: false,
  //     });

  //     const args = {
  //       _xml: `
  //           <i0:Ping>
  //             <i0:entrada>${input}</i0:entrada>
  //           </i0:Ping>
  //         `,
  //     };

  //     const requestCoffig: AxiosRequestConfig = {
  //       method: 'POST',
  //     };
  //     client.on('request', (xml) => {
  //       console.log('XML enviado:', xml); // ¡Confirma que el <Entrada> tenga tu texto!
  //     });
  //     const [result] = await client.PingAsync(args, requestCoffig);
  //     return result.PingResult; // Debería ser "ServicioRetencionFondos - Versión 1.0 - Eco: ${entrada}"
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }

  // private async pingSoap12(entrada: string): Promise<string> {
  //   const client = await soap.createClientAsync(this.WSDL_URL, {
  //     endpoint: this.SOAP12_ENDPOINT,
  //     escapeXML: false,
  //     forceSoap12Headers: true,
  //     envelopeKey: 'soap12',
  //     useEmptyTag: true,
  //     ignoreBaseNameSpaces: true,
  //   });
  //   try {
  //     const args = {
  //       _xml: `
  //       <i0:Ping>
  //         <i0:entrada>${entrada}</i0:entrada>
  //       </i0:Ping>
  //     `,
  //     };

  //     const requestCoffig: AxiosRequestConfig = {
  //       method: 'POST',
  //     };
  //     const headerOptions = {
  //       'wsa:To': {
  //         attributes: { 'xmlns:wsa': 'http://www.w3.org/2005/08/addressing' },
  //         $value: this.SOAP12_ENDPOINT,
  //       },
  //       'wsa:Action': {
  //         attributes: { 'xmlns:wsa': 'http://www.w3.org/2005/08/addressing' },
  //         $value:
  //           'https://srvservicios.asfi.gob.bo/RetencionesDev/IRetencionFondos/Ping',
  //       },
  //     };
  //     client.addSoapHeader(headerOptions);

  //     client.on('request', (xml) => {
  //       console.log('XML enviado:', xml);
  //     });
  //     const [result] = await client.PingAsync(args, requestCoffig);
  //     return result.PingResult;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error();
  //   }
  // }
}
