import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios, { AxiosRequestConfig } from 'axios';
import { createHash } from 'crypto';
import { XMLParser } from 'fast-xml-parser';
import { create } from 'xmlbuilder2';

import * as fs from 'fs';
import * as path from 'path';

// private readonly WSDL_URL =
// 'https://srvservicios.asfi.gob.bo/retencionesDev/ServicioRetencionFondos.svc?wsdl';
// private readonly SOAP11_ENDPOINT =
// 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc/Soap';
// private readonly SOAP12_ENDPOINT =
// 'https://srvservicios.asfi.gob.bo/RetencionesDev/ServicioRetencionFondos.svc/Soap12';

@Injectable()
export class AppService {
  private readonly url = this.configService.get('ASFI_ENDPOINT');

  constructor(private configService: ConfigService) {}

  async ping(entrada: string) {
    try {
      const xml = this.buildPingXML(entrada);

      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction:
            'https://srvservicios.asfi.gob.bo/RetencionesDev/IRetencionFondos/Ping',
        },
      };

      const response = await axios.post(this.url, xml, config);
      const parsed = this.parseXMLResponse(response.data);
      return { message: parsed['Envelope']['Body'] };
    } catch (error) {
      console.error('Error al realizar la solicitud Ping', error);
      throw new Error('Error al realizar la solicitud');
    }
  }

  async consultarEntidadVigente() {
    const builder = create({ version: '1.0', encoding: 'UTF-8' });

    const xml = builder
      .ele('soapenv:Envelope', {
        'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
        'xmlns:ret': 'https://srvservicios.asfi.gob.bo/RetencionesDev/',
        'xmlns:urn': 'urn:ASFI:2014:Marzo:25',
      })
      .ele('soapenv:Header')
      .up()
      .ele('soapenv:Body')
      .ele('ret:ConsultaEntidadVigenteRequest')
      .ele('ret:Identidad')
      .ele('urn:Usuario')
      .txt(this.configService.get('ASFI_USER'))
      .up()
      .ele('urn:Clave')
      .txt(this.configService.get('ASFI_PASSWORD'))
      .end({ prettyPrint: true });

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: this.url,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction:
          'https://srvservicios.asfi.gob.bo/RetencionesDev/IRetencionFondos/ConsultaEntidadVigente',
      },
      data: xml,
    };

    try {
      const response = await axios(config);
      const parsed = this.parseXMLResponse(response.data);
      const result = parsed['Envelope']['Body'];

      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async consultarCabeceras() {
    try {
      const usuario = this.configService.get('ASFI_USER');
      const clave = this.configService.get('ASFI_PASSWORD');

      const builder = create({ version: '1.0', encoding: 'UTF-8' });
      const xml = builder
        .ele('soapenv:Envelope', {
          'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
          'xmlns:ret': 'https://srvservicios.asfi.gob.bo/retencionesDEV/',
          'xmlns:urn': 'urn:ASFI:2014:Marzo:25',
        })
        .ele('soapenv:Header')
        .up()
        .ele('soapenv:Body')
        .ele('ret:ConsultaCabeceraRequest')
        .ele('ret:Identidad')
        .ele('urn:Usuario')
        .txt(usuario)
        .up()
        .ele('urn:Clave')
        .txt(clave)
        .end({ prettyPrint: true });

      const config: AxiosRequestConfig = {
        method: 'POST',
        url: this.url, // ya apunta a /Soap
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction:
            'https://srvservicios.asfi.gob.bo/retencionesDEV/IRetencionFondos/ConsultaCabecera',
        },
        data: xml,
      };

      const response = await axios(config);
      console.log('✅ XML enviado:\n', xml);
      console.log('📥 Respuesta:\n', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error en consultarCabeceras:', error);
      throw new InternalServerErrorException('Error al consultar cabeceras');
    }
  }

  private generateSHA1(content: string): string {
    return createHash('sha1')
      .update(content, 'utf8')
      .digest('hex')
      .toUpperCase();
  }

  private loadPdfAsBase64(fileName: string): string {
    const filePath = path.resolve(__dirname, '..', 'assets', fileName);
    const buffer = fs.readFileSync(filePath);
    return buffer.toString('base64');
  }

  async remitirSolicitud() {
    try {
      const usuario = this.configService.get('ASFI_USER');
      const clave = this.configService.get('ASFI_PASSWORD');
      const entidad = 'G12';

      const pdfBase64 = this.loadPdfAsBase64('nota_solicitud.pdf');
      const hashImagen = this.generateSHA1(pdfBase64);

      const cabecera = {
        idSolicitud: '10003',
        entidad,
        tipoProceso: 'R',
        codigoSolicitud: 'CITE-54321',
        fechaEnvio: '20250415093000',
        gerencia: 'Jurídica',
        autoridadSolicitante: 'Juan Pérez',
        autoridadCargo: 'Director Legal',
        adjuntoNombre: 'nota_solicitud.pdf',
        detalleCantidad: '1',
        usuario: 'luis.perez',
      };

      const hashDatosInput = [
        cabecera.adjuntoNombre,
        cabecera.autoridadCargo,
        cabecera.autoridadSolicitante,
        cabecera.codigoSolicitud,
        cabecera.detalleCantidad,
        cabecera.entidad,
        cabecera.fechaEnvio,
        cabecera.gerencia,
        cabecera.idSolicitud,
        cabecera.tipoProceso,
      ]
        .map((v) => v.trim())
        .join('');

      const hashDatos = this.generateSHA1(hashDatosInput);

      const detalle = {
        item: '1',
        apellidoPaterno: 'Gómez',
        apellidoMaterno: 'Ramírez',
        nombres: 'Carlos',
        razonSocial: '',
        tipoDocumento: '2',
        numeroDocumento: '12345678',
        complemento: '',
        extension: 'CB',
        monto: '1234.56',
        tipoRespaldo: '1',
        documentoRespaldo: 'PIET-2025-001',
        autoConclusion: '',
      };

      const hashDetalleInput = [
        detalle.apellidoMaterno, 
        detalle.apellidoPaterno,
        detalle.autoConclusion,
        detalle.complemento,
        detalle.extension,
        detalle.numeroDocumento,
        detalle.tipoDocumento,
        detalle.documentoRespaldo,
        detalle.item,
        detalle.monto,
        detalle.nombres,
        detalle.razonSocial,
        detalle.tipoRespaldo,
      ]
        .map((v) => v.trim())
        .join('');

      const hashDetalle = this.generateSHA1(hashDetalleInput);

      const builder = create({ version: '1.0', encoding: 'UTF-8' });

      const xml = builder
        .ele('soapenv:Envelope', {
          'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
          'xmlns:ret': 'https://srvservicios.asfi.gob.bo/retencionesDEV/',
          'xmlns:urn': 'urn:ASFI:2014:Marzo:25',
        })
        .ele('soapenv:Header')
        .up()
        .ele('soapenv:Body')
        .ele('ret:RemitirSolicitudRequest')
        .ele('ret:Cabecera')
        .ele('urn:IdSolicitud')
        .txt(cabecera.idSolicitud)
        .up()
        .ele('urn:Entidad')
        .txt(cabecera.entidad)
        .up()
        .ele('urn:TipoProceso')
        .txt(cabecera.tipoProceso)
        .up()
        .ele('urn:CodigoSolicitud')
        .txt(cabecera.codigoSolicitud)
        .up()
        .ele('urn:FechaEnvio')
        .txt(cabecera.fechaEnvio)
        .up()
        .ele('urn:Gerencia')
        .txt(cabecera.gerencia)
        .up()
        .ele('urn:AutoridadSolicitante')
        .txt(cabecera.autoridadSolicitante)
        .up()
        .ele('urn:AutoridadCargo')
        .txt(cabecera.autoridadCargo)
        .up()
        .ele('urn:Adjunto')
        .txt(pdfBase64)
        .up()
        .ele('urn:AdjuntoNombre')
        .txt(cabecera.adjuntoNombre)
        .up()
        .ele('urn:DetalleCantidad')
        .txt(cabecera.detalleCantidad)
        .up()
        .ele('urn:HashDatos')
        .txt(hashDatos)
        .up()
        .ele('urn:HashImagen')
        .txt(hashImagen)
        .up()
        .ele('urn:Usuario')
        .txt(cabecera.usuario)
        .up()
        .up()
        .ele('ret:Detalles')
        .ele('urn:Detalle')
        .ele('urn:Item')
        .txt(detalle.item)
        .up()
        .ele('urn:ApellidoPaterno')
        .txt(detalle.apellidoPaterno)
        .up()
        .ele('urn:ApellidoMaterno')
        .txt(detalle.apellidoMaterno)
        .up()
        .ele('urn:Nombres')
        .txt(detalle.nombres)
        .up()
        .ele('urn:RazonSocial')
        .txt(detalle.razonSocial)
        .up()
        .ele('urn:DocumentoIdentidadTipo')
        .txt(detalle.tipoDocumento)
        .up()
        .ele('urn:DocumentoIdentidadNumero')
        .txt(detalle.numeroDocumento)
        .up()
        .ele('urn:DocumentoIdentidadComplemento')
        .txt(detalle.complemento)
        .up()
        .ele('urn:DocumentoIdentidadExtension')
        .txt(detalle.extension)
        .up()
        .ele('urn:MontoRetencionBs')
        .txt(detalle.monto)
        .up()
        .ele('urn:TipoRespaldo')
        .txt(detalle.tipoRespaldo)
        .up()
        .ele('urn:DocumentoRespaldo')
        .txt(detalle.documentoRespaldo)
        .up()
        .ele('urn:AutoConclusion')
        .txt(detalle.autoConclusion)
        .up()
        .ele('urn:HashDetalle')
        .txt(hashDetalle)
        .up()
        .up()
        .up()
        .ele('ret:Identidad')
        .ele('urn:Usuario')
        .txt(usuario)
        .up()
        .ele('urn:Clave')
        .txt(clave)
        .end({ prettyPrint: true });

      const config: AxiosRequestConfig = {
        method: 'POST',
        url: this.url,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction:
            'https://srvservicios.asfi.gob.bo/retencionesDEV/IRetencionFondos/RemitirSolicitud',
        },
        data: xml,
      };

      const response = await axios(config);
      console.log('✅ XML enviado:\n', xml);
      console.log('📥 Respuesta:\n', response.data);
      // Guardar el XML generado en un archivo
      const outputPath = path.resolve(
        __dirname,
        '..',
        'assets',
        'remitir_solicitud.xml',
      );
      fs.writeFileSync(outputPath, xml, 'utf8');
      console.log(`📁 XML guardado en: ${outputPath}`);

      return response.data;
    } catch (error) {
      console.error('❌ Error en remitirSolicitud:', error);
      throw new InternalServerErrorException('Error al remitir solicitud');
    }
  }

  async consultarListaEstadoEnvio() {
    try {
      const usuario = this.configService.get('ASFI_USER');
      const clave = this.configService.get('ASFI_PASSWORD');
      const entidad = 'G12'; // o el código válido para tu institución
      const fechaEnvio = '20240101000000'; // podés dejarlo vacío si querés traer todo

      const builder = create({ version: '1.0', encoding: 'UTF-8' });
      const xml = builder
        .ele('soapenv:Envelope', {
          'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
          'xmlns:ret': 'https://srvservicios.asfi.gob.bo/retencionesDEV/',
          'xmlns:urn': 'urn:ASFI:2014:Marzo:25',
        })
        .ele('soapenv:Header')
        .up()
        .ele('soapenv:Body')
        .ele('ret:ConsultarListaEstadoEnvioRequest')
        .ele('ret:Entidad')
        .txt(entidad)
        .up()
        .ele('ret:FechaEnvio')
        .txt(fechaEnvio)
        .up()
        .ele('ret:Identidad')
        .ele('urn:Usuario')
        .txt(usuario)
        .up()
        .ele('urn:Clave')
        .txt(clave)
        .end({ prettyPrint: true });

      const config: AxiosRequestConfig = {
        method: 'POST',
        url: this.url,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction:
            'https://srvservicios.asfi.gob.bo/retencionesDEV/IRetencionFondos/ConsultarListaEstadoEnvio',
        },
        data: xml,
      };

      const response = await axios(config);
      console.log('✅ XML enviado:\n', xml);
      console.log('📥 Respuesta:\n', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error en consultarListaEstadoEnvio:', error);
      throw new InternalServerErrorException(
        'Error al consultar lista de estado de envío',
      );
    }
  }

  private buildPingXML(entrada: string): string {
    const xmlContent = create({ version: '1.0' })
      .ele('soapenv:Envelope', {
        'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
        'xmlns:ret': 'https://srvservicios.asfi.gob.bo/RetencionesDev/',
      })
      .ele('soapenv:Header')
      .up()
      .ele('soapenv:Body')
      .ele('ret:Ping')
      .ele('ret:entrada')
      .txt(entrada)
      .up()
      .up()
      .up()
      .end({ prettyPrint: true });

    return xmlContent;
  }

  private parseXMLResponse(xml: string) {
    const parser = new XMLParser({ removeNSPrefix: true });
    const jsonObj = parser.parse(xml);
    return jsonObj;
  }
}
