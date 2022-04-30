import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Token, TokenDocument } from '../schemas/token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/diary/services/user.service';
import { User } from 'src/schemas/users.schema';
import { hashPassword } from 'src/utils/transform';
import options from 'src/utils/options';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async findUser(fio: string, group: string, password: string) {
    const user: User | null = await this.usersService.getOne({ fio, group, password });
    return user;
  }

  async register(body: any) {
    const { fio, group, password } = body;
    const user = await this.findUser(fio, group, password);
    if (user) {
      throw new HttpException('User with this details already exists!', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.usersService.create({ ...body, password: hashPassword(password), role: options.defaultRole });
    return this.login(newUser.fio, group, password);
  }

  async login(fio: string, group: string, password: string) {
    const user = await this.findUser(fio, group, hashPassword(password));
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    return this.generateTokens(user);
  }

  async refreshTokens(token: string) {
    try {
      this.jwtService.verify(token, {
        secret: options.jwtRefreshKey,
      });
    } catch (err) {
      throw new HttpException(err.toString(), HttpStatus.BAD_REQUEST);
    }

    const refreshToken = await this.tokenModel.findOne({ token });
    if (!refreshToken) throw new HttpException('This token expired or does not exist!', HttpStatus.UNAUTHORIZED);

    const user = await this.usersService.getOne({ _id: refreshToken.user });
    if (!user) throw new HttpException('This user does not exist!', HttpStatus.UNAUTHORIZED);

    return this.generateTokens(user);
  }

  async generateTokens(user: any) {
    if (user) {
      const payload = { sub: user._id, group: user.group };
      const refreshToken = this.jwtService.sign(
        { ...payload, type: 'refresh' },
        {
          secret: options.jwtRefreshKey,
          expiresIn: '30d',
        },
      );

      const tokenDoc = await this.tokenModel.findOne({ user: user._id });
      if (tokenDoc) await tokenDoc.remove();

      await this.tokenModel.create({
        user: user._id,
        token: refreshToken,
      });

      return {
        access_token: this.jwtService.sign({ ...payload, type: 'access' }),
        refresh_token: refreshToken,
      };
    }
    return null;
  }
}
