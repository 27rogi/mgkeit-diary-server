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
  @UsePermissions('homeworks.get')
  @Get()
  getAll(@Query(new JoiValidationPipe(homeworkValidations.getAll)) query) {
    return this.homeworkService.getAll({}, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('homeworks.byGroup')
  @Get('/group/:id')
  getByGroup(
    @Param(new JoiValidationPipe(homeworkValidations.getByGroup)) params,
    @Query(new JoiValidationPipe(homeworkValidations.getAll)) query,
  ) {
    return this.homeworkService.getAll({ group: params.id }, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('homeworks.get')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(homeworkValidations.get)) params) {
    return this.homeworkService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('homeworks.manage')
  @Post()
  create(@Body(new JoiValidationPipe(homeworkValidations.create)) body) {
    return this.homeworkService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('homeworks.manage')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(homeworkValidations.update)) params, @Body(new JoiValidationPipe(homeworkValidations.update)) body) {
    return this.homeworkService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('homeworks.manage')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(homeworkValidations.delete)) params) {
    return this.homeworkService.delete(params.id);
  }
}
