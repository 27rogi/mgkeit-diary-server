import { teacherInfoValidations } from './../../validations/teacherInfo.validation';
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
import { TeacherInfoService } from '../services/teacherInfo.service';

@Controller('teacherInfos')
export class TeacherInfoController {
  constructor(private teacherInfoService: TeacherInfoService) {}

  @Get()
  getAll(@Query(new JoiValidationPipe(teacherInfoValidations.getAll)) query) {
    return this.teacherInfoService.getAll({}, query.page, query.limit);
  }

  @Get(':id')
  getOne(@Param(new JoiValidationPipe(teacherInfoValidations.get)) params) {
    return this.teacherInfoService.getOne(params.id);
  }

  @Post()
  create(@Body(new JoiValidationPipe(teacherInfoValidations.create)) body) {
    return this.teacherInfoService.create(body);
  }

  @Patch(':id')
  update(
    @Param(new JoiValidationPipe(teacherInfoValidations.update)) params,
    @Body(new JoiValidationPipe(teacherInfoValidations.update)) body,
  ) {
    return this.teacherInfoService.update(params.id, body);
  }

  @Delete(':id')
  delete(@Param(new JoiValidationPipe(teacherInfoValidations.delete)) params) {
    return this.teacherInfoService.delete(params.id);
  }
}
