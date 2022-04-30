import { gradeValidations } from './../../validations/grade.validation';
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
import { GradeService } from '../services/grade.service';

@Controller('grades')
export class GradeController {
  constructor(private gradeService: GradeService) {}

  @Get()
  getAll(@Query(new JoiValidationPipe(gradeValidations.getAll)) query) {
    return this.gradeService.getAll({}, query.page, query.limit);
  }

  @Get(':id')
  getOne(@Param(new JoiValidationPipe(gradeValidations.get)) params) {
    return this.gradeService.getOne(params.id);
  }

  @Post()
  create(@Body(new JoiValidationPipe(gradeValidations.create)) body) {
    return this.gradeService.create(body);
  }

  @Patch(':id')
  update(
    @Param(new JoiValidationPipe(gradeValidations.update)) params,
    @Body(new JoiValidationPipe(gradeValidations.update)) body,
  ) {
    return this.gradeService.update(params.id, body);
  }

  @Delete(':id')
  delete(@Param(new JoiValidationPipe(gradeValidations.delete)) params) {
    return this.gradeService.delete(params.id);
  }
}
