import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsePermissions } from 'src/utils/permissions.decorator';
import { JoiValidationPipe } from 'src/utils/validation';
import { userValidations } from 'src/validations/user.validation';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getUser')
  @Get()
  getAll(@Query(new JoiValidationPipe(userValidations.getAll)) query) {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getUsers')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(userValidations.get)) params) {
    return this.userService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('createUser')
  @Post()
  create(@Body(new JoiValidationPipe(userValidations.create)) body) {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('patchUser')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(userValidations.update)) params, @Body(new JoiValidationPipe(userValidations.update)) body) {
    return this.userService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('deleteUser')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(userValidations.delete)) params) {
    return this.userService.delete(params.id);
  }
}
