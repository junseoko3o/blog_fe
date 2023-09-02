import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './user/auth/jwt-auth.guard';
import { HttpExceptionFilter } from './exception/exception.filter';
import * as cookieParser from 'cookie-parser';

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
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser()); 
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
