import { replacementValidations } from './../../validations/replacement.validation';
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
import { ReplacementService } from '../services/replacement.service';

@Controller('replacements')
export class ReplacementController {
  constructor(private replacementService: ReplacementService) {}

  @Get()
  getAll(@Query(new JoiValidationPipe(replacementValidations.getAll)) query) {
    return this.replacementService.getAll({}, query.page, query.limit);
  }

  @Get(':id')
  getOne(@Param(new JoiValidationPipe(replacementValidations.get)) params) {
    return this.replacementService.getOne(params.id);
  }

  @Post()
  create(@Body(new JoiValidationPipe(replacementValidations.create)) body) {
    return this.replacementService.create(body);
  }

  @Patch(':id')
  update(
    @Param(new JoiValidationPipe(replacementValidations.update)) params,
    @Body(new JoiValidationPipe(replacementValidations.update)) body,
  ) {
    return this.replacementService.update(params.id, body);
  }

  @Delete(':id')
  delete(@Param(new JoiValidationPipe(replacementValidations.delete)) params) {
    return this.replacementService.delete(params.id);
  }
}
