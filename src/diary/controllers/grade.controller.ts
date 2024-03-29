import { gradeValidations } from './../../validations/grade.validation';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
import { GradeService } from '../services/grade.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsePermissions } from 'src/utils/permissions.decorator';

@Controller('grades')
export class GradeController {
  constructor(private gradeService: GradeService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('grades.get')
  @Get()
  getAll(@Query(new JoiValidationPipe(gradeValidations.getAll)) query) {
    return this.gradeService.getAll({}, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('grades.byGroup')
  @Get('/group/:id')
  getByGroup(@Param(new JoiValidationPipe(gradeValidations.getByGroup)) params, @Query(new JoiValidationPipe(gradeValidations.getAll)) query) {
    return this.gradeService.getAll({ group: params.id }, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('grades.get')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(gradeValidations.get)) params) {
    return this.gradeService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('grades.manage')
  @Post()
  create(@Body(new JoiValidationPipe(gradeValidations.create)) body) {
    return this.gradeService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('grades.manage')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(gradeValidations.update)) params, @Body(new JoiValidationPipe(gradeValidations.update)) body) {
    return this.gradeService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('grades.manage')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(gradeValidations.delete)) params) {
    return this.gradeService.delete(params.id);
  }
}
