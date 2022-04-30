import options from 'src/utils/options';
import { DiaryModule } from './diary/diary.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DiaryModule, AuthModule, MongooseModule.forRoot(options.mongoPath)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
