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
import { RoleService } from 'src/diary/services/role.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private rolesService: RoleService,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async findUser(fio: string, group: string, password: string) {
    const user = await this.usersService.getOne({ fio, group, password });
    return user;
  }

  async register(body: any) {
    body.password = hashPassword(body.password);

    const user = await this.findUser(body.fio, body.group, body.password);
    if (user) {
      throw new HttpException('User with this details already exists!', HttpStatus.BAD_REQUEST);
    }

    const defaultRole = await this.rolesService.getRoleWithPermissions(['defaultRole']);
    const newUser = await this.usersService.create({ ...body, role: defaultRole });
    return await this.login(newUser.fio, body.group, body.password);
  }

  async login(fio: string, group: string, password: string) {
    const user = await this.findUser(fio, group, password);
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    return this.generateTokens(user);
  }

  async logout(user) {
    const refreshToken = await this.tokenModel.findOne({ user: user._id, type: 'refresh' });
    const accessToken = await this.tokenModel.findOne({ user: user._id, type: 'access' });

    if (!refreshToken && !accessToken) {
      throw new HttpException('You already logged out!', HttpStatus.BAD_REQUEST);
    }

    if (accessToken) await accessToken.remove();
    if (refreshToken) await refreshToken.remove();

    return { result: 'Logged out.' };
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
    if (!user) throw new HttpException('This user does not exist!', HttpStatus.UNAUTHORIZED);

    const payload = { sub: user._id, group: user.group };

    const accessToken = this.jwtService.sign({ ...payload, type: 'access' });
    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      {
        secret: options.jwtRefreshKey,
        expiresIn: '30d',
      },
    );

    const accessTokenDoc = await this.tokenModel.findOne({ user: user._id, type: 'access' });
    if (accessTokenDoc) await accessTokenDoc.remove();

    const refreshTokenDoc = await this.tokenModel.findOne({ user: user._id, type: 'refresh' });
    if (refreshTokenDoc) await refreshTokenDoc.remove();

    await this.tokenModel.create({
      user: user._id,
      token: accessToken,
      type: 'access',
    });

    await this.tokenModel.create({
      user: user._id,
      token: refreshToken,
      type: 'refresh',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
