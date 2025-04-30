import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { create } from 'xmlbuilder2';

import { ASFI_INSTITUTION_CONFIG, XML_NAMESPACES } from '../constants';
import { ItemSolicitudDto, RemitirSolicitudDto } from '../dtos';
import { createHash } from 'crypto';
import { formatToAnsi } from 'src/helpers';
import { FilesService } from 'src/modules/files/files.service';
import { readFileSync } from 'fs';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';

interface RemitirRemisionFondosData {
  cabecera: {
    idRemision: number;
    numeroSirefo: string;
    identificadorRemision: string;
    autoridadSolicitante: string;
    gerenciaSolicitante: string;
    cargoAutoridadSolicitante: string;
    fechaHoraEmision: string; // YYYYMMDDHHMISS
    detalleCantidad: number;
    hashDatos: string;
    adjunto: string; // PDF en base64
    adjuntoNombre: string;
    hashImagen: string;
    entidad: string;
    usuario: string;
  };
  detalles: {
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
    hashDatos: string;
    entidad: string;
    usuario: string;
  }[];
  identidad: {
    usuario: string;
    clave: string;
  };
}

interface remitirSolictudProps extends RemitirSolicitudDto {
  id: string;
  sentDate: Date;
}

@Injectable()
export class XmlService {
  private readonly ASFI_USER = this.configService.get('ASFI_USER');
  private readonly ASFI_PASSWORD = this.configService.get('ASFI_PASSWORD');

  constructor(
    private configService: ConfigService,
    private fileService: FilesService,
  ) {}

  generateXmlForPing(message: string) {
    return create({ version: '1.0' })
      .ele('soapenv:Envelope', {
        'xmlns:soapenv': XML_NAMESPACES.SOAPENV,
        'xmlns:ret': XML_NAMESPACES.RET,
      })
      .ele('soapenv:Header')
      .up()
      .ele('soapenv:Body')
      .ele('ret:Ping')
      .ele('ret:entrada')
      .txt(message)
      .up()
      .up()
      .up()
      .end({ prettyPrint: true });
  }

  generateXmlForConsultarCabecera() {
    return create({ version: '1.0', encoding: 'UTF-8' })
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
  }

  generateXml_RemitirSolicitud(data: remitirSolictudProps) {
    const filePath = this.fileService.getStaticFilePath(data.attachmentName);
    const entity = ASFI_INSTITUTION_CONFIG.CODE;

    const fileBuffer = readFileSync(filePath);
    const fileBase64 = fileBuffer.toString('base64');

    const hashImagen = this.generateSHA1(fileBase64);

    const headerContent = [
      data.attachmentName,
      data.authorityPosition,
      data.requestingAuthority,
      data.requestCode,
      data.details.length,
      entity,
      data.sentDate,
      data.department,
      data.id,
      data.processType,
    ]
      .map((item) => item.toString())
      .join('');

    const headerHash = this.generateSHA1(headerContent);

    const builder = create({ version: '1.0', encoding: 'UTF-8' });

    const xmlRoot = builder
      .ele('soapenv:Envelope', {
        'xmlns:soapenv': XML_NAMESPACES.SOAPENV,
        'xmlns:ret': XML_NAMESPACES.RET,
        'xmlns:urn': XML_NAMESPACES.URN,
      })
      .ele('soapenv:Header')
      .up()
      .ele('soapenv:Body')
      .ele('ret:RemitirSolicitudRequest')
      .ele('ret:Cabecera')
      .ele('urn:IdSolicitud')
      .txt(data.id)
      .up()
      .ele('urn:Entidad')
      .txt(entity)
      .up()
      .ele('urn:TipoProceso')
      .txt(data.processType)
      .up()
      .ele('urn:CodigoSolicitud')
      .txt(data.requestCode)
      .up()
      .ele('urn:FechaEnvio')
      .txt(formatToAnsi(data.sentDate))
      .up()
      .ele('urn:Gerencia')
      .txt(data.department)
      .up()
      .ele('urn:AutoridadSolicitante')
      .txt(data.requestingAuthority)
      .up()
      .ele('urn:AutoridadCargo')
      .txt(data.authorityPosition)
      .up()
      .ele('urn:Adjunto')
      .txt(fileBase64)
      .up()
      .ele('urn:AdjuntoNombre')
      .txt(data.attachmentName)
      .up()
      .ele('urn:DetalleCantidad')
      .txt(data.details.length.toString())
      .up()
      .ele('urn:HashDatos')
      .txt(headerHash)
      .up()
      .ele('urn:HashImagen')
      .txt(hashImagen)
      .up()
      .ele('urn:Usuario')
      .txt('data.usuario')
      .up();

    const detailsElement = xmlRoot.ele('ret:Detalles');
    data.details.forEach((detail) => {
      this.buildDetailXml(detailsElement, detail);
    });

    xmlRoot
      .ele('urn:Usuario')
      .txt(this.ASFI_USER)
      .up()
      .ele('urn:Clave')
      .txt(this.ASFI_PASSWORD);

    return builder.end({ prettyPrint: true });
  }

  generateXml_ConsultarEstadoEvio(id: string) {
    return create({ version: '1.0', encoding: 'UTF-8' })
      .ele('soapenv:Envelope', {
        'xmlns:soapenv': XML_NAMESPACES.SOAPENV,
        'xmlns:ret': XML_NAMESPACES.RET,
        'xmlns:urn': XML_NAMESPACES.URN,
      })
      .ele('soapenv:Header')
      .up()
      .ele('soapenv:Body')
      .ele('ret:ConsultarEstadoSolicitudRequest')
      .ele('ret:IdSolicitud')
      .txt(id)
      .up()
      .ele('ret:Identidad')
      .ele('urn:Usuario')
      .txt(this.ASFI_USER)
      .up()
      .ele('urn:Clave')
      .txt(this.ASFI_PASSWORD)

      .end({ prettyPrint: true });
  }

  generateXmlForRemitirRemisionFondos(data: RemitirRemisionFondosData) {
    const hashCabecera = this.buildHashCabecera(data.cabecera);
    data.cabecera.hashDatos = hashCabecera;

    for (const detalle of data.detalles) {
      const hashItem = this.buildHashItem(detalle);
      detalle.hashDatos = hashItem;
    }

    const root = create({ version: '1.0' }).ele('soapenv:Envelope', {
      'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:ret': 'https://srvservicios.asfi.gob.bo/retencionesDEV/',
      'xmlns:lym': 'lym:ASFI:2018:Diciembre:17',
      'xmlns:urn': 'urn:ASFI:2014:Marzo:25',
    });

    const body = root
      .ele('soapenv:Header')
      .up()
      .ele('soapenv:Body')
      .ele('ret:RemitirRemisionRequest');

    // Cabecera
    const cabecera = body.ele('ret:Cabecera');
    cabecera
      .ele('lym:IdRemision')
      .txt(data.cabecera.idRemision.toString())
      .up();
    cabecera.ele('lym:NumeroSIREFO').txt(data.cabecera.numeroSirefo).up();
    cabecera
      .ele('lym:IdentificadorRemision')
      .txt(data.cabecera.identificadorRemision)
      .up();
    cabecera
      .ele('lym:AutoridadSolicitante')
      .txt(data.cabecera.autoridadSolicitante)
      .up();
    cabecera
      .ele('lym:GerenciaSolicitante')
      .txt(data.cabecera.gerenciaSolicitante)
      .up();
    cabecera
      .ele('lym:CargoAutoridadSolicitante')
      .txt(data.cabecera.cargoAutoridadSolicitante)
      .up();
    cabecera
      .ele('lym:FechaHoraEmision')
      .txt(data.cabecera.fechaHoraEmision)
      .up();
    cabecera
      .ele('lym:DetalleCantidad')
      .txt(data.cabecera.detalleCantidad.toString())
      .up();
    cabecera.ele('lym:HashDatos').txt(data.cabecera.hashDatos).up();
    cabecera.ele('lym:Adjunto').txt(data.cabecera.adjunto).up();
    cabecera.ele('lym:AdjuntoNombre').txt(data.cabecera.adjuntoNombre).up();
    cabecera.ele('lym:HashImagen').txt(data.cabecera.hashImagen).up();
    cabecera.ele('lym:Entidad').txt(data.cabecera.entidad).up();
    cabecera.ele('lym:Usuario').txt(data.cabecera.usuario).up();
    cabecera.up();

    // Detalles
    const detalles = body.ele('ret:Detalles');

    for (const item of data.detalles) {
      const itemRemision = detalles.ele('lym:ItemRemision');
      itemRemision.ele('lym:Item').txt(item.item.toString()).up();
      if (item.apellidoPaterno)
        itemRemision.ele('lym:ApellidoPaterno').txt(item.apellidoPaterno).up();
      if (item.apellidoMaterno)
        itemRemision.ele('lym:ApellidoMaterno').txt(item.apellidoMaterno).up();
      if (item.nombres) itemRemision.ele('lym:Nombres').txt(item.nombres).up();
      if (item.razonSocial)
        itemRemision.ele('lym:RazonSocial').txt(item.razonSocial).up();
      itemRemision.ele('lym:NumeroDocumento').txt(item.numeroDocumento).up();
      if (item.documentoComplemento)
        itemRemision
          .ele('lym:DocumentoComplemento')
          .txt(item.documentoComplemento)
          .up();
      if (item.extensionDocumento)
        itemRemision
          .ele('lym:ExtensionDocumento')
          .txt(item.extensionDocumento)
          .up();
      itemRemision
        .ele('lym:TipoDocumento')
        .txt(item.tipoDocumento.toString())
        .up();
      itemRemision
        .ele('lym:DocumentoRespaldo')
        .txt(item.documentoRespaldo)
        .up();
      itemRemision
        .ele('lym:TipoRespaldo')
        .txt(item.tipoRespaldo.toString())
        .up();
      itemRemision
        .ele('lym:MontoRemision')
        .txt(item.montoRemision.toFixed(2))
        .up();
      itemRemision.ele('lym:NumeroCuenta').txt(item.numeroCuenta).up();
      itemRemision
        .ele('lym:CuentaMoneda')
        .txt(item.cuentaMoneda.toString())
        .up();
      itemRemision.ele('lym:CodigoEnvio').txt(item.codigoEnvio).up();
      itemRemision.ele('lym:HashDatos').txt(item.hashDatos).up();
      itemRemision.ele('lym:Entidad').txt(item.entidad).up();
      itemRemision.ele('lym:Usuario').txt(item.usuario).up();
      itemRemision.up();
    }
    detalles.up();

    // Identidad
    const identidad = body.ele('ret:Identidad');
    identidad.ele('urn:Usuario').txt(this.ASFI_USER).up();
    identidad.ele('urn:Clave').txt(this.ASFI_PASSWORD).up();
    identidad.up();

    return root.end({ prettyPrint: true });
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

  private buildHashCabecera(data: {
    idRemision: number | string;
    numeroSirefo: string;
    identificadorRemision: string;
    autoridadSolicitante: string;
    gerenciaSolicitante: string;
    cargoAutoridadSolicitante: string;
    fechaHoraEmision: string;
    detalleCantidad: number;
    entidad: string;
  }): string {
    const concat =
      data.numeroSirefo +
      data.idRemision.toString() +
      data.identificadorRemision +
      data.autoridadSolicitante +
      data.gerenciaSolicitante +
      data.cargoAutoridadSolicitante +
      data.fechaHoraEmision +
      data.detalleCantidad.toString() +
      data.entidad;

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
    entidad: string;
    usuario: string;
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
      item.tipoDocumento.toString() +
      item.documentoRespaldo +
      item.tipoRespaldo.toString() +
      item.montoRemision +
      item.numeroCuenta +
      item.cuentaMoneda.toString() +
      item.codigoEnvio +
      item.entidad +
      item.usuario;

    return this.generateSHA1(concat);
  }

  private generateSHA1(content: string): string {
    return createHash('sha1')
      .update(content, 'utf8')
      .digest('hex')
      .toUpperCase();
  }
}
