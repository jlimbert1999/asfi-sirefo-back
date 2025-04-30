import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import axios, { AxiosRequestConfig } from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { create } from 'xmlbuilder2';
import { createHash } from 'crypto';

import { ItemSolicitudDto, PingDto, RemitirSolicitudDto } from '../dtos';
import {
  ASFI_INSTITUTION_CONFIG,
  SOAP_ACTIONS,
  XML_NAMESPACES,
} from '../constants';
import * as fs from 'fs';
import * as path from 'path';
import { formatToAnsi } from 'src/helpers';
import { XmlService } from './xml.service';

@Injectable()
export class SirefoService {
  private readonly ASFI_URL = this.configService.get('ASFI_ENDPOINT');
  private readonly ASFI_USER = this.configService.get('ASFI_USER');
  private readonly ASFI_PASSWORD = this.configService.get('ASFI_PASSWORD');

  constructor(
    private xmlService: XmlService,
    private configService: ConfigService,
  ) {}

  async ping({ message }: PingDto) {
    try {
      const xml = this.xmlService.generateXmlForPing(message);
      const config: AxiosRequestConfig = {
        url: this.ASFI_URL,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: SOAP_ACTIONS.PING,
        },
        data: xml,
      };
      const response = await axios(config);
      const parsed = this.parseXMLResponse(response.data);
      return {
        message: parsed['Envelope']['Body']['PingResponse']['PingResult'],
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async consultarCabecera() {
    try {
      const xml = this.xmlService.generateXmlForConsultarCabecera();
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: SOAP_ACTIONS.CONSULTAR_CABECERA,
        },
      };

      const response = await axios.post(this.ASFI_URL, xml, config);
      const parsed = this.parseXMLResponse(response.data);
      console.log(parsed);
      return parsed;
    } catch (error) {
      console.error('❌ Error en consultarCabeceras:', error);
      throw new InternalServerErrorException('Error al consultar cabeceras');
    }
  }

  async consultarEntidadVigente() {
    const builder = create({ version: '1.0', encoding: 'UTF-8' });

    const xml = builder
      .ele('soapenv:Envelope', {
        'xmlns:soapenv': XML_NAMESPACES.SOAPENV,
        'xmlns:ret': XML_NAMESPACES.RET,
        'xmlns:urn': XML_NAMESPACES.URN,
      })
      .ele('soapenv:Header')
      .up()
      .ele('soapenv:Body')
      .ele('ret:ConsultaEntidadVigenteRequest')
      .ele('ret:Identidad')
      .ele('urn:Usuario')
      .txt(this.ASFI_USER)
      .up()
      .ele('urn:Clave')
      .txt(this.ASFI_PASSWORD)
      .end({ prettyPrint: true });

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: SOAP_ACTIONS.CONSULTAR_ENTIDAD_VIGENTE,
      },
    };

    try {
      const response = await axios.post(this.ASFI_URL, xml, config);
      const parsed = this.parseXMLResponse(response.data);
      const result = parsed['Envelope']['Body'];

      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remitirSolicitud(data: RemitirSolicitudDto) {
    try {
      const fileName = 'nota_solicitud.pdf';
      const pdfBase64 = this.loadPdfAsBase64(fileName);
      const hashImagen = this.generateSHA1(pdfBase64);
      const headerSirefo = {
        ...data,
        entity: ASFI_INSTITUTION_CONFIG.CODE,
        sentDate: formatToAnsi(new Date()),
        quantityDetail: data.details.length,
        usuario: 'luis.perez',
      };

      // const cabecera = {
      //   idSolicitud: '10003',
      //   entidad: ASFI_INSTITUTION_CONFIG.CODE,
      //   tipoProceso: 'R',
      //   codigoSolicitud: 'CITE-54321',
      //   fechaEnvio: '20250415093000',
      //   gerencia: 'Jurídica',
      //   autoridadSolicitante: 'Juan Pérez',
      //   autoridadCargo: 'Director Legal',
      //   adjuntoNombre: 'nota_solicitud.pdf',
      //   detalleCantidad: '1',
      //   usuario: 'luis.perez',
      // };

      const hashDatosInput = [
        fileName,
        headerSirefo.authorityPosition,
        headerSirefo.requestingAuthority,
        headerSirefo.requestCode,
        headerSirefo.quantityDetail,
        headerSirefo.entity,
        headerSirefo.sentDate,
        headerSirefo.department,
        headerSirefo.id,
        headerSirefo.processType,
      ]
        .map((v) => v.toString().trim())
        .join('');

      const hashDatos = this.generateSHA1(hashDatosInput);

      const detalles = [
        {
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
        },
      ];

      // detalles.forEach((d) => {
      //   const hashDetalleInput = [
      //     d.apellidoMaterno,
      //     d.apellidoPaterno,
      //     d.autoConclusion,
      //     d.complemento,
      //     d.extension,
      //     d.numeroDocumento,
      //     d.tipoDocumento,
      //     d.documentoRespaldo,
      //     d.item,
      //     d.monto,
      //     d.nombres,
      //     d.razonSocial,
      //     d.tipoRespaldo,
      //   ]
      //     .map((v) => v.trim())
      //     .join('');

      //   d.hashDetalle = this.generateSHA1(hashDetalleInput);
      // });

      const builder = create({ version: '1.0', encoding: 'UTF-8' });

      const xmlRoot = builder
        .ele('soapenv:Envelope', {
          'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
          'xmlns:ret': 'https://srvservicios.asfi.gob.bo/retencionesDEV/',
          'xmlns:urn': 'urn:ASFI:2014:Marzo:25',
        })
        .ele('soapenv:Header')
        .up()
        .ele('soapenv:Body')
        .ele('ret:RemitirSolicitudRequest');

      const cabeceraXml = xmlRoot.ele('ret:Cabecera');
      cabeceraXml.ele('urn:IdSolicitud').txt(headerSirefo.id).up();
      cabeceraXml.ele('urn:Entidad').txt(headerSirefo.entity).up();
      cabeceraXml.ele('urn:TipoProceso').txt(headerSirefo.processType).up();
      cabeceraXml.ele('urn:CodigoSolicitud').txt(headerSirefo.requestCode).up();
      cabeceraXml.ele('urn:FechaEnvio').txt(headerSirefo.sentDate).up();
      cabeceraXml.ele('urn:Gerencia').txt(headerSirefo.department).up();
      cabeceraXml
        .ele('urn:AutoridadSolicitante')
        .txt(headerSirefo.requestingAuthority)
        .up();
      cabeceraXml
        .ele('urn:AutoridadCargo')
        .txt(headerSirefo.authorityPosition)
        .up();
      cabeceraXml.ele('urn:Adjunto').txt(pdfBase64).up();
      cabeceraXml.ele('urn:AdjuntoNombre').txt(fileName).up();
      cabeceraXml
        .ele('urn:DetalleCantidad')
        .txt(headerSirefo.quantityDetail.toString())
        .up();
      cabeceraXml.ele('urn:HashDatos').txt(hashDatos).up();
      cabeceraXml.ele('urn:HashImagen').txt(hashImagen).up();
      cabeceraXml.ele('urn:Usuario').txt(headerSirefo.usuario).up();

      const detallesElement = xmlRoot.ele('ret:Detalles');

      data.details.forEach((detail) => {
        this.buildDetailXml(detallesElement, detail);
      });

      const identidadXml = xmlRoot.ele('ret:Identidad');
      identidadXml.ele('urn:Usuario').txt(this.ASFI_USER).up();
      identidadXml.ele('urn:Clave').txt(this.ASFI_PASSWORD);

      const xml = builder.end({ prettyPrint: true });

      const config: AxiosRequestConfig = {
        method: 'POST',
        url: this.ASFI_URL,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: SOAP_ACTIONS.REMITIR_SOLICITUD,
        },
        data: xml,
      };

      const response = await axios(config);
      const parsed = this.parseXMLResponse(response.data);
      const outputPath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'assets',
        'remitir_solicitud.xml',
      );
      fs.writeFileSync(outputPath, xml, 'utf8');
      console.log(response.status);
      console.log(parsed);
      return parsed;
    } catch (error) {
      console.error('❌ Error en remitirSolicitud:', error);
      throw new InternalServerErrorException('Error al remitir solicitud');
    }
  }

  async consultarListaEstadoEnvio() {
    try {
      const fechaEnvio = '20230101000000'; // podés dejarlo vacío si querés traer todo

      const builder = create({ version: '1.0', encoding: 'UTF-8' });
      const xml = builder
        .ele('soapenv:Envelope', {
          'xmlns:soapenv': XML_NAMESPACES.SOAPENV,
          'xmlns:ret': XML_NAMESPACES.RET,
          'xmlns:urn': XML_NAMESPACES.URN,
        })
        .ele('soapenv:Header')
        .up()
        .ele('soapenv:Body')
        .ele('ret:ConsultarListaEstadoEnvioRequest')
        .ele('ret:Entidad')
        .txt(ASFI_INSTITUTION_CONFIG.CODE)
        .up()
        .ele('ret:FechaEnvio')
        .txt(fechaEnvio)
        .up()
        .ele('ret:Identidad')
        .ele('urn:Usuario')
        .txt(this.ASFI_USER)
        .up()
        .ele('urn:Clave')
        .txt(this.ASFI_PASSWORD)
        .end({ prettyPrint: true });

      const config: AxiosRequestConfig = {
        method: 'POST',
        url: this.ASFI_URL,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: SOAP_ACTIONS.CONSULTAR_LISTADO_ESTADOS,
        },
        data: xml,
      };

      const response = await axios(config);
      const parset = this.parseXMLResponse(response.data);
      return parset['Envelope']['Body']['ListaEstadoSolicitud'][
        'EstadoConsultaEnvio'
      ];
    } catch (error) {
      console.error('❌ Error en consultarListaEstadoEnvio:', error);
      throw new InternalServerErrorException(
        'Error al consultar lista de estado de envío',
      );
    }
  }

  async consultarCabeceras() {
    try {
      const builder = create({ version: '1.0', encoding: 'UTF-8' });
      const xml = builder
        .ele('soapenv:Envelope', {
          'xmlns:soapenv': XML_NAMESPACES.SOAPENV,
          'xmlns:ret': XML_NAMESPACES.RET,
          'xmlns:urn': XML_NAMESPACES.URN,
        })
        .ele('soapenv:Header')
        .up()
        .ele('soapenv:Body')
        .ele('ret:ConsultaCabeceraRequest')
        .ele('ret:Identidad')
        .ele('urn:Usuario')
        .txt(this.ASFI_USER)
        .up()
        .ele('urn:Clave')
        .txt(this.ASFI_PASSWORD)
        .end({ prettyPrint: true });

      const config: AxiosRequestConfig = {
        method: 'POST',
        url: this.ASFI_URL,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: SOAP_ACTIONS.CONSULTAR_CABECERA,
        },
        data: xml,
      };

      const response = await axios(config);
      const parsed = this.parseXMLResponse(response.data);
      console.log(parsed);
      return parsed;
    } catch (error) {
      console.error('❌ Error en consultarCabeceras:', error);
      throw new InternalServerErrorException('Error al consultar cabeceras');
    }
  }

  async consultarEstadoEvio(id: string) {
    try {
      const xml = this.xmlService.generateXml_ConsultarEstadoEvio(id);
      console.dir(xml);
      const config: AxiosRequestConfig = {
        url: this.ASFI_URL,
        method: 'POST',
        data: xml,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: SOAP_ACTIONS.CONSULTAR_ESTADO_ENVIO,
        },
      };
      const response = await axios(config);
      const parsed = this.parseXMLResponse(response.data);
      console.log(parsed);
      return parsed;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async remitirRemisionFondos() {
    try {
      const fileName = 'nota_solicitud.pdf';
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'assets',
        fileName,
      );
      const pdfBase64 = fs.readFileSync(filePath).toString('base64');

      // --- 2. Generar hashes ---
      const hashImagen = this.generateSHA1(pdfBase64);

      // --- 3. Preparar la data completa ---
      const data = {
        cabecera: {
          idRemision: 7,
          numeroSirefo: 'ASFI/1216/2025',
          identificadorRemision: 'REM-002',
          autoridadSolicitante: 'AUTORIDAD',
          gerenciaSolicitante: 'GERENCIA',
          cargoAutoridadSolicitante: 'DIRECTOR',
          fechaHoraEmision: '20250428120000', // Formato YYYYMMDDHHMMSS
          detalleCantidad: 2, // Solo un ítem en este ejemplo
          hashDatos: '',
          adjunto: pdfBase64,
          adjuntoNombre: 'nota_solicitud.pdf',
          hashImagen: hashImagen,
          entidad: 'G12', // Tu entidad asignada
          usuario: 'luis.perez',
        },
        detalles: [
          // {
          //   item: 1,
          //   apellidoPaterno: 'Gómez',
          //   apellidoMaterno: 'Ramírez',
          //   nombres: 'Carlos',
          //   razonSocial: '',
          //   numeroDocumento: '12345678',
          //   documentoComplemento: '2',
          //   extensionDocumento: 'CB',
          //   tipoDocumento: 2, // CI
          //   documentoRespaldo: 'PIET-2025-001',
          //   tipoRespaldo: 1, // PIET, por ejemplo
          //   montoRemision: 1234.56,
          //   numeroCuenta: '1002003004005',
          //   cuentaMoneda: 1, // Bolivianos
          //   codigoEnvio: 'IBBUN', // Código del banco destino
          //   hashDatos: '',
          //   entidad: 'G12', // Tu código de entidad
          //   usuario: 'luis.perez',
          // },
          {
            item: 1,
            apellidoPaterno: 'Pérez',
            apellidoMaterno: 'Ramírez',
            nombres: 'Ana',
            razonSocial: '',
            numeroDocumento: '98765432',
            documentoComplemento: '2',
            extensionDocumento: 'CB',
            tipoDocumento: 2, // CI
            documentoRespaldo: 'INF-2025-005',
            tipoRespaldo: 2, // PIET, por ejemplo
            montoRemision: 567.89,
            numeroCuenta: '2002003004005',
            cuentaMoneda: 1, // Bolivianos
            codigoEnvio: 'IBBUN', // Código del banco destino
            hashDatos: '',
            entidad: 'G12', // Tu código de entidad
            usuario: 'luis.perez',
          },
          {
            item: 2,
            apellidoPaterno: 'Rodríguez',
            apellidoMaterno: 'Vargas',
            nombres: 'Luis',
            razonSocial: '',
            numeroDocumento: '11223344',
            documentoComplemento: '2',
            extensionDocumento: 'SC',
            tipoDocumento: 2, // CI
            documentoRespaldo: 'MEM-2025-010',
            tipoRespaldo: 1, // PIET, por ejemplo
            montoRemision: 2345.67,
            numeroCuenta: '3002003004005',
            cuentaMoneda: 1, // Bolivianos
            codigoEnvio: 'IBBUN', // Código del banco destino
            hashDatos: '',
            entidad: 'G12', // Tu código de entidad
            usuario: 'luis.perez',
          },
        ],
        identidad: {
          usuario: 'miUsuario',
          clave: 'miClave123',
        },
      };

      // --- 4. Generar el XML ---
      const xml = this.xmlService.generateXmlForRemitirRemisionFondos(data);

      const outputPath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'assets',
        'remitir_remision_solicitud_2.xml',
      );
      fs.writeFileSync(outputPath, xml, 'utf8');

      const config: AxiosRequestConfig = {
        method: 'POST',
        url: this.ASFI_URL,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: SOAP_ACTIONS.REMITIR_REMISION_FONDOS,
        },
        data: xml,
      };
      const response = await axios.post(this.ASFI_URL, xml, config);
      console.dir(response.data);
      return { ok: 'generated', xml: response['data'] };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  private loadPdfAsBase64(fileName: string): string {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'assets',
      fileName,
    );
    const buffer = fs.readFileSync(filePath);
    return buffer.toString('base64');
  }

  private generateSHA1(content: string): string {
    return createHash('sha1')
      .update(content, 'utf8')
      .digest('hex')
      .toUpperCase();
  }

  private parseXMLResponse(xml: string) {
    const parser = new XMLParser({ removeNSPrefix: true });
    const jsonObj = parser.parse(xml);
    return jsonObj;
  }

  private buildDetailXml(xml: XMLBuilder, detail: ItemSolicitudDto) {
    const hashDetailInput = [
      detail.maternalLastName,
      detail.paternalLastName,
      detail.autoConclusion,
      detail.complement,
      detail.extension,
      detail.documentNumber,
      detail.documentType,
      detail.supportDocument,
      detail.item,
      detail.amount,
      detail.firstName,
      detail.businessName,
      detail.supportType,
    ]
      .map((item) => (item ? item.toString().trim() : ''))
      .join('');

    const hashDetail = this.generateSHA1(hashDetailInput);

    return xml
      .ele('urn:Detalle')
      .ele('urn:Item')
      .txt(detail.item.toString())
      .up()
      .ele('urn:ApellidoPaterno')
      .txt(detail.paternalLastName)
      .up()
      .ele('urn:ApellidoMaterno')
      .txt(detail.maternalLastName)
      .up()
      .ele('urn:Nombres')
      .txt(detail.firstName)
      .up()
      .ele('urn:RazonSocial')
      .txt(detail.businessName)
      .up()
      .ele('urn:DocumentoIdentidadTipo')
      .txt(detail.documentType.toString())
      .up()
      .ele('urn:DocumentoIdentidadNumero')
      .txt(detail.documentNumber)
      .up()
      .ele('urn:DocumentoIdentidadComplemento')
      .txt(detail.complement)
      .up()
      .ele('urn:DocumentoIdentidadExtension')
      .txt(detail.extension)
      .up()
      .ele('urn:MontoRetencionBs')
      .txt(detail.amount)
      .up()
      .ele('urn:TipoRespaldo')
      .txt(detail.supportType)
      .up()
      .ele('urn:DocumentoRespaldo')
      .txt(detail.supportDocument)
      .up()
      .ele('urn:AutoConclusion')
      .txt(detail.autoConclusion)
      .up()
      .ele('urn:HashDetalle')
      .txt(hashDetail)
      .up()
      .up();
  }

  async remitirConfirmacionRequest() {
    const data = {
      numeroSirefo: 'ASFI/1216/2025',
      IdentificadorSolicitud: 'REM-002',
      NombreRazoSocial: 'Ana Pérez Ramírez',
      TipoDocumento: 2,
      NumeroDocumento: '98765432',
      ExtensionDocumento: 'CB',
      Monto: 567.89,
      FueReportado: '1',
      CodigoEnvio: 'IBBUN',
      FechaHoraEmision: '20250429120000',
      TipoAccion: '1',
      Entidad: 'G12',
      Usuario: 'luis.perez',
      HashDatos: '',
    };
    const concat =
      data.numeroSirefo +
      data.IdentificadorSolicitud +
      data.NombreRazoSocial +
      data.TipoDocumento +
      data.NumeroDocumento +
      data.ExtensionDocumento +
      data.Monto.toFixed(2) +
      data.CodigoEnvio +
      data.FechaHoraEmision +
      data.Entidad;

    const hash = this.generateSHA1(concat);
    try {
      const xml = create({ version: '1.0' })
        .ele('soapenv:Envelope', {
          'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
          'xmlns:ret': 'https://srvservicios.asfi.gob.bo/retencionesDEV/',
          'xmlns:lym': 'lym:ASFI:2018:Mayo:05',
          'xmlns:urn': 'urn:ASFI:2014:Marzo:25',
        })
        .ele('soapenv:Header')
        .up()
        .ele('soapenv:Body')
        .ele('ret:RemitirConfirmacionRequest')
        .ele('ret:ConfirmacionEntidad')
        .ele('lym:NumeroSIREFO')
        .txt(data.numeroSirefo)
        .up()
        .ele('lym:IdentificadorSolicitud')
        .txt(data.IdentificadorSolicitud)
        .up()
        .ele('lym:NombreRazoSocial')
        .txt(data.NombreRazoSocial)
        .up()
        .ele('lym:TipoDocumento')
        .txt(data.TipoDocumento.toString())
        .up()
        .ele('lym:NumeroDocumento')
        .txt(data.NumeroDocumento)
        .up()
        .ele('lym:ExtensionDocumento')
        .txt(data.ExtensionDocumento)
        .up()
        .ele('lym:Monto')
        .txt(data.Monto.toFixed(2))
        .up()
        .ele('lym:FueReportado')
        .txt(data.FueReportado)
        .up()
        .ele('lym:CodigoEnvio')
        .txt(data.CodigoEnvio)
        .up()
        .ele('lym:FechaHoraEmision')
        .txt(data.FechaHoraEmision)
        .up()
        .ele('lym:TipoAccion')
        .txt(data.TipoAccion)
        .up()
        .ele('lym:Entidad')
        .txt(data.Entidad)
        .up()
        .ele('lym:Usuario')
        .txt(data.Usuario)
        .up()
        .ele('lym:HashDatos')
        .txt(hash)
        .up()
        .up()
        .ele('ret:Identidad')
        .ele('urn:Usuario')
        .txt(this.ASFI_USER)
        .up()
        .ele('urn:Clave')
        .txt(this.ASFI_PASSWORD)
        .end({ prettyPrint: true });
      const config: AxiosRequestConfig = {
        method: 'POST',
        url: this.ASFI_URL,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: SOAP_ACTIONS.REMITIR_CONFIRMACION_ENTIDAD,
        },
        data: xml,
      };
      const response = await axios(config);
      return { ok: false };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  private buildHashCabecera(data: {
    idRemision: number | string;
    numeroSirefo: string;
    identificadorRemision: string;
    autoridadSolicitante: string;
    gerenciaSolicitante: string;
    cargoAutoridadSolicitante: string;
    fechaHoraEmision: string;
    detalleCantidad: number;
  }): string {
    const concat =
      data.idRemision.toString() +
      data.numeroSirefo +
      data.identificadorRemision +
      data.autoridadSolicitante +
      data.gerenciaSolicitante +
      data.cargoAutoridadSolicitante +
      data.fechaHoraEmision +
      data.detalleCantidad.toString();

    return this.generateSHA1(concat);
  }

  private buildHashItem(item: {
    item: number;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    nombres?: string;
    razonSocial?: string;
    numeroDocumento: string;
    documentoComplemento?: string;
    extensionDocumento?: string;
    tipoDocumento: number;
    documentoRespaldo: string;
    tipoRespaldo: number;
    montoRemision: number;
    numeroCuenta: string;
    cuentaMoneda: number;
    codigoEnvio: string;
  }): string {
    const monto = item.montoRemision.toFixed(2); // Siempre 2 decimales
    const concat =
      item.item.toString() +
      (item.apellidoPaterno || '') +
      (item.apellidoMaterno || '') +
      (item.nombres || '') +
      (item.razonSocial || '') +
      item.numeroDocumento +
      (item.documentoComplemento || '') +
      (item.extensionDocumento || '') +
      item.tipoDocumento.toString() +
      item.documentoRespaldo +
      item.tipoRespaldo.toString() +
      monto +
      item.numeroCuenta +
      item.cuentaMoneda.toString() +
      item.codigoEnvio;

    return this.generateSHA1(concat);
  }
}
