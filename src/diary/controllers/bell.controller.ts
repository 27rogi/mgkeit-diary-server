import { bellValidations } from './../../validations/bell.validation';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
import { BellService } from '../services/bell.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsePermissions } from 'src/utils/permissions.decorator';

@Controller('bells')
export class BellController {
  constructor(private bellService: BellService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getBell')
  @Get()
  getAll(@Query(new JoiValidationPipe(bellValidations.getAll)) query) {
    return this.bellService.getAll({}, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getBells')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(bellValidations.get)) params) {
    return this.bellService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('createBell')
  @Post()
  create(@Body(new JoiValidationPipe(bellValidations.create)) body) {
    return this.bellService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('patchBell')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(bellValidations.update)) params, @Body(new JoiValidationPipe(bellValidations.update)) body) {
    return this.bellService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('deleteBell')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(bellValidations.delete)) params) {
    return this.bellService.delete(params.id);
  }
}
