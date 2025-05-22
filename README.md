# TMS Backend

Sistema de gestión de transporte (TMS) desarrollado con NestJS, TypeScript y MySQL. Este backend provee autenticación, gestión de usuarios y registro de actividades, todo orquestado mediante Docker.

## Descripción

Este proyecto implementa una API RESTful para la gestión de usuarios y autenticación, ideal para sistemas de transporte o logística. Incluye:

- Autenticación con JWT
- Gestión de usuarios (CRUD, activación/desactivación, cambio de contraseña)
- Registro de actividades de usuario
- Documentación automática con Swagger y TypeDoc
- Despliegue sencillo con Docker y Docker Compose

## Arquitectura

- **NestJS** como framework principal
- **TypeORM** para la gestión de la base de datos MySQL
- **Swagger** para documentación interactiva de la API
- **TypeDoc** para documentación técnica del código
- **Docker** y **docker-compose** para orquestación de servicios

## Requisitos previos

- Docker y Docker Compose instalados
- pnpm (opcional, para desarrollo local)

## Variables de entorno

Las variables principales ya están definidas en `docker-compose.yml`:

- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_NAME`
- `JWT_SECRET` (puedes definirla para producción)

## Uso rápido con Docker

```bash
docker-compose up --build
```

Esto levantará dos servicios:

- **tms-backend**: API en http://localhost:3000
- **tms-mysql**: Base de datos MySQL en el puerto 3307

## Documentación de la API

Una vez levantado el backend, accede a la documentación interactiva en:

- [http://localhost:3000/openapi](http://localhost:3000/openapi)

## Generar documentación técnica

Para generar la documentación técnica del código fuente (TypeDoc):

```bash
pnpm install
pnpm run docs
```

La documentación se generará en la carpeta `docs`.

## Endpoints principales

### Autenticación

- `POST /auth/login`: Iniciar sesión (requiere email y contraseña)
- `GET /auth/profile`: Obtener perfil del usuario autenticado (requiere JWT)

### Usuarios

- `POST /users`: Crear usuario
- `GET /users`: Listar todos los usuarios
- `GET /users/:rut`: Obtener usuario por RUT
- `PATCH /users/:rut`: Actualizar usuario
- `PATCH /users/:rut/desactivar`: Desactivar usuario
- `DELETE /users/:rut`: Eliminar usuario

## Scripts útiles

- `pnpm run start`: Iniciar en modo desarrollo
- `pnpm run start:dev`: Iniciar con recarga automática
- `pnpm run start:prod`: Iniciar en modo producción
- `pnpm run test`: Ejecutar tests
- `pnpm run docs`: Generar documentación técnica

## Licencia

MIT
