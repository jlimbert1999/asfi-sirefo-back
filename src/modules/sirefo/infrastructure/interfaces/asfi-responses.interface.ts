export interface remitirSolicitudResponse {
  Envelope: {
    Body: {
      EstadoEnvio: {
        Respuesta: number;
        Detalle: string;
        Confirmacion: boolean;
      };
    };
  };
}

export interface remitirRemisionFondosResponse {
  Envelope: {
    Body: {
      EstadoEnvio: {
        Respuesta: number;
        Detalle: string;
        Confirmacion: boolean;
      };
    };
  };
}

export interface consultarEstadoEnvioResponse {
  Envelope: {
    Body: {
      EstadoDeSolicitud: {
        Estado: string;
        ErrorEnvio: string;
        Circular: string;
        FechaCircular: number;
      };
    };
  };
}

export interface listaEntidadVigenteResponse {
  Envelope: {
    Body: {
      ListaEntidadVigente: {
        EntidadVigente: {
          CodigoEnvio: string;
          Descripcion: string;
          CodigoTipoEntidad: string;
          DescripcionTipoEntidad: string;
          Estado: true;
        }[];
      };
    };
  };
}
