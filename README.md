# Sistema de Gestión de Retenciones, Suspensiones y Remisión de Fondos - Backend

API del sistema de **Gestión de Retenciones, Suspensiones y Remisión de Fondos**.

## Descripción

Este sistema permite gestionar procesos de retención, suspensión y remisión de fondos, interoperando con el sistema SIREFO de la ASFI para el intercambio de información y validación de operaciones.

## Funcionalidades principales

- Registro y gestión de retenciones
- Gestión de suspensiones
- Remisión de fondos
- Interoperabilidad con el sistema SIREFO
- Consulta y seguimiento de operaciones

## Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

- Node.js
- npm
- PostgreSQL

## Instalación

```bash
npm install
```

## Configuración

Renombra el archivo `.env.template` a `.env` en la raíz del proyecto y configura las variables de entorno necesarias.

## Ejecución del proyecto

### Modo desarrollo

```bash
npm run start:dev
```

### Modo producción

```bash
npm run build
npm run start:prod
```