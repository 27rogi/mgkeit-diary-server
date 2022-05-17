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
  @UsePermissions('schedules.get')
  @Get()
  getAll(@Query(new JoiValidationPipe(scheduleValidations.getAll)) query) {
    return this.scheduleService.getAll({}, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('schedules.get')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(scheduleValidations.get)) params, @Query(new JoiValidationPipe(scheduleValidations.get)) query) {
    console.log(params.id);
    return this.scheduleService.getOne({ _id: params.id }, query.detailed);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('schedules.byGroup')
  @Get('/group/:id')
  getByGroup(
    @Param(new JoiValidationPipe(scheduleValidations.getByGroup)) params,
    @Query(new JoiValidationPipe(scheduleValidations.getAll)) query,
  ) {
    return this.scheduleService.getAll({ group: params.id }, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('schedules.byGroup')
  @Get('/group/:id/:date')
  getByGroupAndDate(@Param(new JoiValidationPipe(scheduleValidations.getByGroupAndDate)) params) {
    console.log(params.date);
    return this.scheduleService.getOne({ group: params.id, weekDate: params.date }, true);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('schedules.manage')
  @Post()
  create(@Body(new JoiValidationPipe(scheduleValidations.create)) body) {
    return this.scheduleService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('schedules.manage')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(scheduleValidations.update)) params, @Body(new JoiValidationPipe(scheduleValidations.update)) body) {
    return this.scheduleService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('schedules.manage')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(scheduleValidations.delete)) params) {
    return this.scheduleService.delete(params.id);
  }
}
