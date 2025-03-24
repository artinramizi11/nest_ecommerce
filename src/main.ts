import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataIntercept } from './data.intercept';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new DataIntercept)
  app.useGlobalPipes(new ValidationPipe)
  const config = new DocumentBuilder()
  .setTitle("E-Commerce API")
  .setDescription("Example for an E-Commerce API")
  .setVersion('1.0')
  .addBearerAuth()
  .addTag("E-Commerce")
  .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, documentFactory)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
