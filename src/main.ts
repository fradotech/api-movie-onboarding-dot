import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentUtils } from './utils/environment.utils';
import AppConfig, { ServerConfig, VersionConfig } from './config/app.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig: ServerConfig = AppConfig().server;
  const versionConfig: VersionConfig = AppConfig().version;
  
  app.enableCors()
  app.setGlobalPrefix(`api/${versionConfig}`)
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
    .setBasePath(`api/${versionConfig}`)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const isProduction = new EnvironmentUtils().isProduction();

  if (!isProduction) SwaggerModule.setup('docs', app, document);

  await app.listen(serverConfig.port);
}
bootstrap();
