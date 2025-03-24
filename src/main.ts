import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataIntercept } from './data.intercept';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new DataIntercept)
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
