import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //############ Swagger Config ##############
  const options = new DocumentBuilder()
    .setTitle('Learning Node')
    .setDescription('Node JS, Express, Nest, and Types ORM')
    .setVersion('1.0.0')
    .addTag('Node')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document);
  //############ Swagger Config ##############

  await app.listen(3000);
  console.log('app running on port 3000');
}
bootstrap();
