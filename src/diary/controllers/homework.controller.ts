import { homeworkValidations } from './../../validations/homework.validation';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
import { HomeworkService } from '../services/homework.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsePermissions } from 'src/utils/permissions.decorator';

@Controller('homeworks')
export class HomeworkController {
  constructor(private homeworkService: HomeworkService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getHomeworks')
  @Get()
  getAll(@Query(new JoiValidationPipe(homeworkValidations.getAll)) query) {
    return this.homeworkService.getAll({}, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getHomework')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(homeworkValidations.get)) params) {
    return this.homeworkService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('createHomework')
  @Post()
  create(@Body(new JoiValidationPipe(homeworkValidations.create)) body) {
    return this.homeworkService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('patchHomework')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(homeworkValidations.update)) params, @Body(new JoiValidationPipe(homeworkValidations.update)) body) {
    return this.homeworkService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('deleteHomework')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(homeworkValidations.delete)) params) {
    return this.homeworkService.delete(params.id);
  }
}
