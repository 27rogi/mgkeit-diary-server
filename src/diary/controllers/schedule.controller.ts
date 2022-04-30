import { scheduleValidations } from './../../validations/schedule.validation';
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
import { ScheduleService } from '../services/schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  getAll(@Query(new JoiValidationPipe(scheduleValidations.getAll)) query) {
    return this.scheduleService.getAll({}, query.page, query.limit);
  }

  @Get(':id')
  getOne(
    @Param(new JoiValidationPipe(scheduleValidations.get)) params,
    @Query(new JoiValidationPipe(scheduleValidations.get)) query,
  ) {
    return this.scheduleService.getOne(params.id, query.detailed);
  }

  @Post()
  create(@Body(new JoiValidationPipe(scheduleValidations.create)) body) {
    return this.scheduleService.create(body);
  }

  @Patch(':id')
  update(
    @Param(new JoiValidationPipe(scheduleValidations.update)) params,
    @Body(new JoiValidationPipe(scheduleValidations.update)) body,
  ) {
    return this.scheduleService.update(params.id, body);
  }

  @Delete(':id')
  delete(@Param(new JoiValidationPipe(scheduleValidations.delete)) params) {
    return this.scheduleService.delete(params.id);
  }
}
