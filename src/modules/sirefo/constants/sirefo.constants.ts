export const XML_NAMESPACES = {
  SOAPENV: 'http://schemas.xmlsoap.org/soap/envelope/',
  RET: 'https://srvservicios.asfi.gob.bo/retencionesDEV/',
  URN: 'urn:ASFI:2014:Marzo:25',
};

export const ASFI_INSTITUTION_CONFIG = {
  CODE: 'G12',
};

export const SOAP_ACTIONS = {
  PING: `${XML_NAMESPACES.RET}IRetencionFondos/Ping`,
  CONSULTAR_CABECERA: `${XML_NAMESPACES.RET}IRetencionFondos/ConsultaCabecera`,
  CONSULTAR_LISTADO_ESTADOS: `${XML_NAMESPACES.RET}IRetencionFondos/ConsultarListaEstadoEnvio`,
  CONSULTAR_ENTIDAD_VIGENTE: `${XML_NAMESPACES.RET}IRetencionFondos/ConsultaEntidadVigente`,
  REMITIR_SOLICITUD: `${XML_NAMESPACES.RET}IRetencionFondos/RemitirSolicitud`,
  CONSULTAR_ESTADO_ENVIO: `${XML_NAMESPACES.RET}IRetencionFondos/ConsultarEstadoSolicitud`,
  REMITIR_REMISION_FONDOS: `${XML_NAMESPACES.RET}IRetencionFondos/RemitirRemisionFondos`,
  REMITIR_CONFIRMACION_ENTIDAD: `${XML_NAMESPACES.RET}IRetencionFondos/RemitirConfirmacionEntidad`,
};
