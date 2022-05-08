import { DiaryModule } from './../diary/diary.module';
import { AuthService } from './services/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import options from 'src/utils/options';
import { AuthController } from './controllers/auth.controller';
import { Token, TokenSchema } from './schemas/token.schema';
import { UserService } from 'src/diary/services/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    DiaryModule,
    PassportModule,
    JwtModule.register({
      secret: options.jwtKey,
      signOptions: { expiresIn: '5m' },
    }),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
