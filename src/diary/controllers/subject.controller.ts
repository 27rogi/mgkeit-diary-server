import { subjectValidations } from './../../validations/subject.validation';
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
import { SubjectService } from '../services/subject.service';

@Controller('subjects')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  getAll(@Query(new JoiValidationPipe(subjectValidations.getAll)) query) {
    return this.subjectService.getAll({}, query.page, query.limit);
  }

  @Get(':id')
  getOne(@Param(new JoiValidationPipe(subjectValidations.get)) params) {
    return this.subjectService.getOne(params.id);
  }

  @Post()
  create(@Body(new JoiValidationPipe(subjectValidations.create)) body) {
    return this.subjectService.create(body);
  }

  @Patch(':id')
  update(
    @Param(new JoiValidationPipe(subjectValidations.update)) params,
    @Body(new JoiValidationPipe(subjectValidations.update)) body,
  ) {
    return this.subjectService.update(params.id, body);
  }

  @Delete(':id')
  delete(@Param(new JoiValidationPipe(subjectValidations.delete)) params) {
    return this.subjectService.delete(params.id);
  }
}
