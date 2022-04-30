import { homeworkValidations } from './../../validations/homework.validation';
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
import { HomeworkService } from '../services/homework.service';

@Controller('homeworks')
export class HomeworkController {
  constructor(private homeworkService: HomeworkService) {}

  @Get()
  getAll(@Query(new JoiValidationPipe(homeworkValidations.getAll)) query) {
    return this.homeworkService.getAll({}, query.page, query.limit);
  }

  @Get(':id')
  getOne(@Param(new JoiValidationPipe(homeworkValidations.get)) params) {
    return this.homeworkService.getOne(params.id);
  }

  @Post()
  create(@Body(new JoiValidationPipe(homeworkValidations.create)) body) {
    return this.homeworkService.create(body);
  }

  @Patch(':id')
  update(
    @Param(new JoiValidationPipe(homeworkValidations.update)) params,
    @Body(new JoiValidationPipe(homeworkValidations.update)) body,
  ) {
    return this.homeworkService.update(params.id, body);
  }

  @Delete(':id')
  delete(@Param(new JoiValidationPipe(homeworkValidations.delete)) params) {
    return this.homeworkService.delete(params.id);
  }
}
