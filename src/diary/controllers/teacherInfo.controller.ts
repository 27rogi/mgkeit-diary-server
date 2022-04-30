import { teacherInfoValidations } from './../../validations/teacherInfo.validation';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
import { TeacherInfoService } from '../services/teacherInfo.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsePermissions } from 'src/utils/permissions.decorator';

@Controller('teacherInfos')
export class TeacherInfoController {
  constructor(private teacherInfoService: TeacherInfoService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getAllTeacherInfo')
  @Get()
  getAll(@Query(new JoiValidationPipe(teacherInfoValidations.getAll)) query) {
    return this.teacherInfoService.getAll({}, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getTeacherInfo')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(teacherInfoValidations.get)) params) {
    return this.teacherInfoService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('createTeacherInfo')
  @Post()
  create(@Body(new JoiValidationPipe(teacherInfoValidations.create)) body) {
    return this.teacherInfoService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('patchTeacherInfo')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(teacherInfoValidations.update)) params, @Body(new JoiValidationPipe(teacherInfoValidations.update)) body) {
    return this.teacherInfoService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('deleteTeacherInfo')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(teacherInfoValidations.delete)) params) {
    return this.teacherInfoService.delete(params.id);
  }
}
