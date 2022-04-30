import { subjectValidations } from './../../validations/subject.validation';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
import { SubjectService } from '../services/subject.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsePermissions } from 'src/utils/permissions.decorator';

@Controller('subjects')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getSubjects')
  @Get()
  getAll(@Query(new JoiValidationPipe(subjectValidations.getAll)) query) {
    return this.subjectService.getAll({}, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getSubject')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(subjectValidations.get)) params) {
    return this.subjectService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('createSubject')
  @Post()
  create(@Body(new JoiValidationPipe(subjectValidations.create)) body) {
    return this.subjectService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('patchSubject')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(subjectValidations.update)) params, @Body(new JoiValidationPipe(subjectValidations.update)) body) {
    return this.subjectService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('deleteSubject')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(subjectValidations.delete)) params) {
    return this.subjectService.delete(params.id);
  }
}
