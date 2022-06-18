import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentUtils } from './utils/environment.utils';
import AppConfig, { ServerConfig } from './config/app.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors()
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true,
    validateCustomDecorators: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Movie API Docs')
    .setDescription('Movie API documentation collection')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const isProduction = new EnvironmentUtils().isProduction();

  if (!isProduction) SwaggerModule.setup('docs', app, document);

  const serverConfig: ServerConfig = AppConfig().server;

  await app.listen(serverConfig.port);
}
bootstrap();
