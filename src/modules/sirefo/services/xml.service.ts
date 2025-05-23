import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { create } from 'xmlbuilder2';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

import { AsfiFundTransferWithFile, AsfiRequestWithFile } from 'src/modules/prisma/types';
import { FilesService } from 'src/modules/files/files.service';
import { AnsiDateUtil } from 'src/helpers';

import { ASFI_INSTITUTION_CONFIG, XML_NAMESPACES } from '../constants';
import { ItemRequestDto, ItemFundTransferDto, AsfiCredentialsDto } from '../dtos';
import { IAsfiCredentials } from '../infrastructure';
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

  generateXmlConsultarCabecera(credentials: IAsfiCredentials) {
    const { email, password } = credentials;
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
      .txt(email)
      .up()
      .ele('urn:Clave')
      .txt(password)
      .end({ prettyPrint: true });
  }

  generateXmlConsultarEstadoEvio(id: number, type: 1 | 2 | 4, credentials: IAsfiCredentials) {
    return create({ version: '1.0', encoding: 'UTF-8' })
      .ele('soapenv:Envelope', {
        'xmlns:soapenv': XML_NAMESPACES.SOAPENV,
        'xmlns:ret': XML_NAMESPACES.RET,
        'xmlns:urn': XML_NAMESPACES.URN,
      })
      .ele('soapenv:Header')
      .up()
      .ele('soapenv:Body')
      .ele('ret:ConsultarEstadoEnvioRequest')
      .ele('ret:Entidad')
      .txt(ASFI_INSTITUTION_CONFIG.CODE)
      .up()
      .ele('ret:IdSolicitud')
      .txt(id.toString())
      .up()
      .ele('ret:Identidad')
      .ele('urn:Usuario')
      .txt(this.ASFI_USER)
      .up()
      .ele('urn:Clave')
      .txt(this.ASFI_PASSWORD)
      .up()
      .up()
      .ele('ret:Tipo')
      .txt(type.toString())
      .end({ prettyPrint: true });
  }

  generateXmlConsultarListaEstadoEnvio(credentials: IAsfiCredentials) {
    const { email, password } = credentials;
    return create({ version: '1.0', encoding: 'UTF-8' })
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
      .txt('20250112000000')
      .up()
      .ele('ret:Identidad')
      .ele('urn:Usuario')
      .txt(email)
      .up()
      .ele('urn:Clave')
      .txt(password)
      .end({ prettyPrint: true });
  }

  async generateXmlRemitirSolicitud(
    item: AsfiRequestWithFile,
    details: ItemRequestDto[],
    credentials: IAsfiCredentials,
  ) {
    const entity = ASFI_INSTITUTION_CONFIG.CODE;

    const fileBase64 = await this.getFileBase64(item.file.fileName);

    const hashImagen = this.generateSHA1(fileBase64);

    const ansiDate = AnsiDateUtil.formatToAnsi(item.sentDate);

    const headerContent = [
      item.file.originalName,
      item.authorityPosition,
      item.requestingAuthority,
      item.requestCode,
      item.quantityDetail,
      entity,
      ansiDate,
      item.department,
      item.requestId,
      item.processType,
    ]
      .map((item) => item.toString().trim())
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
      .txt(item.requestId.toString())
      .up()
      .ele('urn:Entidad')
      .txt(entity)
      .up()
      .ele('urn:TipoProceso')
      .txt(item.processType)
      .up()
      .ele('urn:CodigoSolicitud')
      .txt(item.requestCode)
      .up()
      .ele('urn:FechaEnvio')
      .txt(ansiDate)
      .up()
      .ele('urn:Gerencia')
      .txt(item.department)
      .up()
      .ele('urn:AutoridadSolicitante')
      .txt(item.requestingAuthority)
      .up()
      .ele('urn:AutoridadCargo')
      .txt(item.authorityPosition)
      .up()
      .ele('urn:Adjunto')
      .txt(fileBase64)
      .up()
      .ele('urn:AdjuntoNombre')
      .txt(item.file.originalName)
      .up()
      .ele('urn:DetalleCantidad')
      .txt(item.quantityDetail.toString())
      .up()
      .ele('urn:HashDatos')
      .txt(headerHash)
      .up()
      .ele('urn:HashImagen')
      .txt(hashImagen)
      .up()
      .ele('urn:Usuario')
      .txt(credentials.email)
      .up()
      .up();

    const detailsElement = xmlRoot.ele('ret:Detalles');

    details.forEach((detail) => {
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

      detailsElement
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
        .up()
        .up();
    });

    xmlRoot
      .ele('ret:Identidad')
      .ele('urn:Usuario')
      .txt(credentials.email)
      .up()
      .ele('urn:Clave')
      .txt(credentials.password);

    return builder.end({ prettyPrint: true });
  }

  async generateXmlRemitirRemisionFondos(item: AsfiFundTransferWithFile, details: ItemFundTransferDto[]) {
    const entity = ASFI_INSTITUTION_CONFIG.CODE;

    const fileBase64 = await this.getFileBase64(item.file.fileName);

    const hashImagen = this.generateSHA1(fileBase64);

    const ansiDate = AnsiDateUtil.formatToAnsi(item.sentDate);

    const headerContent = [
      item.asfiRequest.circularNumber,
      item.requestId,
      item.requestCode,
      item.requestingAuthority,
      item.department,
      item.authorityPosition,
      ansiDate,
      item.quantityDetail.toString(),
      entity,
    ]
      .map((item) => item.toString().trim())
      .join('');

    const headerHash = this.generateSHA1(headerContent);

    const xmlRoot = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('soapenv:Envelope', {
        'xmlns:soapenv': XML_NAMESPACES.SOAPENV,
        'xmlns:ret': XML_NAMESPACES.RET,
        'xmlns:urn': XML_NAMESPACES.URN,
        'xmlns:lym': 'lym:ASFI:2018:Diciembre:17',
      })
      .ele('soapenv:Header')
      .up()
      .ele('soapenv:Body')
      .ele('ret:RemitirRemisionRequest')
      .ele('ret:Cabecera')
      .ele('lym:IdRemision')
      .txt(item.requestId.toString())
      .up()
      .ele('lym:NumeroSIREFO')
      .txt(item.asfiRequest.circularNumber)
      .up()
      .ele('lym:IdentificadorRemision')
      .txt(item.requestCode)
      .up()
      .ele('lym:AutoridadSolicitante')
      .txt(item.requestingAuthority)
      .up()
      .ele('lym:GerenciaSolicitante')
      .txt(item.department)
      .up()
      .ele('lym:CargoAutoridadSolicitante')
      .txt(item.authorityPosition)
      .up()
      .ele('lym:FechaHoraEmision')
      .txt(ansiDate)
      .up()
      .ele('lym:DetalleCantidad')
      .txt(item.quantityDetail.toString())
      .up()
      .ele('lym:HashDatos')
      .txt(headerHash)
      .up()
      .ele('lym:Adjunto')
      .txt(fileBase64)
      .up()
      .ele('lym:AdjuntoNombre')
      .txt(item.file.originalName)
      .up()
      .ele('lym:HashImagen')
      .txt(hashImagen)
      .up()
      .ele('lym:Entidad')
      .txt(entity)
      .up()
      .ele('lym:Usuario')
      .txt('luis.perez')
      .up()
      .up();

    const detailsElement = xmlRoot.ele('ret:Detalles');

    for (const detail of details) {
      const hashDetailInput = [
        detail.item,
        detail.paternalLastName,
        detail.maternalLastName,
        detail.firstName,
        detail.businessName,
        detail.documentNumber,
        detail.complement,
        detail.documentType,
        detail.supportDocument,
        detail.supportType,
        detail.amount,
        detail.accountNumber,
        detail.accountCurrency,
        detail.transferCode,
        entity,
        'luis.perez',
      ]
        .map((item) => (item ? item.toString().trim() : ''))
        .join('');

      const hashDetail = this.generateSHA1(hashDetailInput);

      detailsElement
        .ele('lym:ItemRemision')
        .ele('lym:Item')
        .txt(detail.item.toString())
        .up()
        .ele('lym:ApellidoPaterno')
        .txt(detail.paternalLastName)
        .up()
        .ele('lym:ApellidoMaterno')
        .txt(detail.maternalLastName)
        .up()
        .ele('lym:Nombres')
        .txt(detail.firstName)
        .up()
        .ele('lym:RazonSocial')
        .txt(detail.businessName)
        .up()
        .ele('lym:NumeroDocumento')
        .txt(detail.documentNumber)
        .up()
        .ele('lym:DocumentoComplemento')
        .txt(detail.complement)
        .up()
        .ele('lym:ExtensionDocumento')
        .txt(detail.extension)
        .up()
        .ele('lym:TipoDocumento')
        .txt(detail.documentType.toString())
        .up()
        .ele('lym:DocumentoRespaldo')
        .txt(detail.supportDocument.toString())
        .up()
        .ele('lym:TipoRespaldo')
        .txt(detail.supportType.toString())
        .up()
        .ele('lym:MontoRemision')
        .txt(detail.amount)
        .up()
        .ele('lym:NumeroCuenta')
        .txt(detail.accountNumber)
        .up()
        .ele('lym:CuentaMoneda')
        .txt(detail.accountCurrency.toString())
        .up()
        .ele('lym:CodigoEnvio')
        .txt(detail.transferCode)
        .up()
        .ele('lym:HashDatos')
        .txt(hashDetail)
        .up()
        .ele('lym:Entidad')
        .txt(entity)
        .up()
        .ele('lym:Usuario')
        .txt('luis.perez')
        .up()
        .up()
        .up();
    }
    xmlRoot.ele('ret:Identidad').ele('urn:Usuario').txt(this.ASFI_USER).up().ele('urn:Clave').txt(this.ASFI_PASSWORD);
    return xmlRoot.end({ prettyPrint: true });
  }

  private generateSHA1(content: string): string {
    return createHash('sha1').update(content, 'utf8').digest('hex').toUpperCase();
  }

  private async getFileBase64(url: string) {
    const filePath = this.fileService.getStaticFilePath(url);
    const fileBuffer = await readFile(filePath);
    return fileBuffer.toString('base64');
  }
}
