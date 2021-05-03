import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //############ Swagger Config ##############
  const options = new DocumentBuilder()
    .setTitle('Learning Node')
    .setDescription('Node JS, Express, Nest, and Types ORM')
    .setVersion('1.0.0')
    .addTag('Node')
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document);
  //############ Swagger Config ##############

  /** Adding cookies logic */
  app.use(cookieParser());

  await app.listen(3000);
  console.log(`app running on: ${await app.getUrl()}`);
}
bootstrap();
