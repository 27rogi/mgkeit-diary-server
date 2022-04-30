import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/diary/services/user.service';
import options from 'src/utils/options';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: options.jwtKey,
      usernameField: 'fio',
    });
  }

  async validate(payload: any) {
    const user = await this.userService.getOne(
      {
        _id: payload.sub,
      },
      true,
    );
    return user;
  }
}
