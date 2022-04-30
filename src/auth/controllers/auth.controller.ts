import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
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
    return this.authService.login(body.fio, body.group, body.password);
  }

  @Post('register')
  async register(@Body(new JoiValidationPipe(authValidations.register)) body) {
    return this.authService.register(body);
  }
}
