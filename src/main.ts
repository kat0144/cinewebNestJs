import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

   const config = new DocumentBuilder()
   .setTitle('Cinema CRUD API')
   .setDescription('Documentação da API de cinema')
   .addTag('users')
   .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

   app.enableCors();

  await app.listen(process.env.PORT ?? 3001);
  console.log('http://localhost:3001/api');
}
bootstrap();