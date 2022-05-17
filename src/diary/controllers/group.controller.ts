import { groupValidations } from './../../validations/group.validation';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
import { GroupService } from '../services/group.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsePermissions } from 'src/utils/permissions.decorator';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  getAll(@Query(new JoiValidationPipe(groupValidations.getAll)) query) {
    return this.groupService.getAll({}, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('groups.get')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(groupValidations.get)) params) {
    return this.groupService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('groups.manage')
  @Post()
  create(@Body(new JoiValidationPipe(groupValidations.create)) body) {
    return this.groupService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('groups.manage')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(groupValidations.update)) params, @Body(new JoiValidationPipe(groupValidations.update)) body) {
    return this.groupService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('groups.manage')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(groupValidations.delete)) params) {
    return this.groupService.delete(params.id);
  }
}
