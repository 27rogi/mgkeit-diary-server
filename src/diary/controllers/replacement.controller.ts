import { replacementValidations } from './../../validations/replacement.validation';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from 'src/utils/validation';
import { ReplacementService } from '../services/replacement.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { UsePermissions } from 'src/utils/permissions.decorator';

@Controller('replacements')
export class ReplacementController {
  constructor(private replacementService: ReplacementService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getReplacements')
  @Get()
  getAll(@Query(new JoiValidationPipe(replacementValidations.getAll)) query) {
    return this.replacementService.getAll({}, query.page, query.limit);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('getReplacement')
  @Get(':id')
  getOne(@Param(new JoiValidationPipe(replacementValidations.get)) params) {
    return this.replacementService.getOne(params.id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('createReplacement')
  @Post()
  create(@Body(new JoiValidationPipe(replacementValidations.create)) body) {
    return this.replacementService.create(body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('patchReplacement')
  @Patch(':id')
  update(@Param(new JoiValidationPipe(replacementValidations.update)) params, @Body(new JoiValidationPipe(replacementValidations.update)) body) {
    return this.replacementService.update(params.id, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UsePermissions('deleteReplacement')
  @Delete(':id')
  delete(@Param(new JoiValidationPipe(replacementValidations.delete)) params) {
    return this.replacementService.delete(params.id);
  }
}
