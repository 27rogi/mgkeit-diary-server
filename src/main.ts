import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// подключаем библиотеки
import helmet from 'helmet';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // подключаем библиотеки к логике сервера
  app.use(helmet());
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
