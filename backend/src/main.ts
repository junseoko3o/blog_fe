import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exception/global.exception';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AuthGuard } from './user/auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'debug'],
  });

  const reflector = app.get(Reflector);  
  app.useGlobalGuards(
    new AuthGuard(reflector),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(cookieParser()); 
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,POST,PUT,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
