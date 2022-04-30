import { roleValidations } from './../../validations/role.validation';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
import { RoleService } from '../services/role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  getAll(@Query(new JoiValidationPipe(roleValidations.getAll)) query) {
    return this.roleService.getAll();
  }

  @Get(':id')
  getOne(@Param(new JoiValidationPipe(roleValidations.get)) params) {
    return this.roleService.getOne(params.id);
  }

  @Post()
  create(@Body(new JoiValidationPipe(roleValidations.create)) body) {
    return this.roleService.create(body);
  }

  @Patch(':id')
  update(
    @Param(new JoiValidationPipe(roleValidations.update)) params,
    @Body(new JoiValidationPipe(roleValidations.update)) body,
  ) {
    return this.roleService.update(params.id, body);
  }

  @Delete(':id')
  delete(@Param(new JoiValidationPipe(roleValidations.delete)) params) {
    return this.roleService.delete(params.id);
  }
}
