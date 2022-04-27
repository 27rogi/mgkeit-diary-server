import { DiaryModule } from './diary/diary.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DiaryModule,
    MongooseModule.forRoot(
      'mongodb://admin:grox2012@45.90.218.142:27017/diary?authSource=admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
