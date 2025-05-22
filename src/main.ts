import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Punto de entrada de la aplicación.
 * Inicializa NestJS y configura Swagger para la documentación de la API.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger para la documentación interactiva
  const config = new DocumentBuilder()
    .setTitle('TMS API')
    .setDescription('Api para manejar el sistema de gestión de transporte')
    .setVersion('1.0')
    .addTag('TMS API')
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  // Inicia la aplicación en el puerto definido por la variable de entorno o 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
