import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('TMS API')
    .setDescription('Api para manejar el sistema de gestión de transporte')
    .setVersion('1.0')
    .addTag('TMS API')
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();
