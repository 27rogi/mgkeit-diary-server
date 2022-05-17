import { Controller, Post, UseGuards, Body, Get, Req } from '@nestjs/common';
import { hashPassword } from 'src/utils/transform';
import { JoiValidationPipe } from 'src/utils/validation';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthService } from '../services/auth.service';
import { authValidations } from '../validations/auth.validation';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  async refresh(@Body(new JoiValidationPipe(authValidations.refresh)) body) {
    return this.authService.refreshTokens(body.refresh_token);
  }

  @Post('login')
  async login(@Body(new JoiValidationPipe(authValidations.login)) body) {
    return this.authService.login(body.fio, body.group, hashPassword(body.password));
  }

  @Post('register')
  async register(@Body(new JoiValidationPipe(authValidations.register)) body) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() request) {
    return this.authService.logout(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getSelf(@Req() request) {
    return request.user;
  }
}
