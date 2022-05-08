import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/diary/services/user.service';
import options from 'src/utils/options';
import { Model } from 'mongoose';
import { Token, TokenDocument } from '../schemas/token.schema';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService, @InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: options.jwtKey,
      usernameField: 'fio',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload) {
    const token = await this.tokenModel.findOne({ user: payload.sub, token: req.headers.authorization.split('Bearer ')[1], type: 'access' });
    if (!token) throw new UnauthorizedException('This token was revoked!');

    const user = await this.userService.getOne({ _id: payload.sub }, true);
    return user;
  }
}
