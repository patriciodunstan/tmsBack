# Scripts de Base de Datos

Este directorio contiene los scripts SQL relacionados con la base de datos del proyecto.

## Estructura

- `schema.sql`: Contiene la definición del esquema de la base de datos (tablas, índices, etc.)
- `migrations/`: Directorio para los scripts de migración de la base de datos
- `seeds/`: Directorio para los datos iniciales o de prueba

## Uso

Los scripts en este directorio pueden ser utilizados para:

- Inicializar la base de datos
- Realizar migraciones
- Cargar datos de prueba
- Referencia del esquema de la base de datos

## Convenciones

- Los archivos de migración deben seguir el formato: `YYYYMMDD_description.sql`
- Los archivos de seed deben seguir el formato: `seed_description.sql`
- Todos los scripts deben incluir comentarios explicativos
