import { scheduleValidations } from './../../validations/schedule.validation';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
import { ScheduleService } from '../services/schedule.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsePermissions } from 'src/utils/permissions.decorator';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getSchedules')
  @Get()
  getAll(@Query(new JoiValidationPipe(scheduleValidations.getAll)) query) {
    return this.scheduleService.getAll({}, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getSchedule')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(scheduleValidations.get)) params, @Query(new JoiValidationPipe(scheduleValidations.get)) query) {
    return this.scheduleService.getOne(params.id, query.detailed);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('createSchedule')
  @Post()
  create(@Body(new JoiValidationPipe(scheduleValidations.create)) body) {
    return this.scheduleService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('patchSchedule')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(scheduleValidations.update)) params, @Body(new JoiValidationPipe(scheduleValidations.update)) body) {
    return this.scheduleService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('deleteSchedule')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(scheduleValidations.delete)) params) {
    return this.scheduleService.delete(params.id);
  }
}
