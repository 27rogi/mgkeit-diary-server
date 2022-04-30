import { roleValidations } from './../../validations/role.validation';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
import { RoleService } from '../services/role.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsePermissions } from 'src/utils/permissions.decorator';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getRoles')
  @Get()
  getAll(@Query(new JoiValidationPipe(roleValidations.getAll)) query) {
    return this.roleService.getAll();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getRole')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(roleValidations.get)) params) {
    return this.roleService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('createRole')
  @Post()
  create(@Body(new JoiValidationPipe(roleValidations.create)) body) {
    return this.roleService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('patchRole')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(roleValidations.update)) params, @Body(new JoiValidationPipe(roleValidations.update)) body) {
    return this.roleService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('deleteRole')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(roleValidations.delete)) params) {
    return this.roleService.delete(params.id);
  }
}
