import { bellValidations } from './../../validations/bell.validation';
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
import { BellService } from '../services/bell.service';

@Controller('bells')
export class BellController {
  constructor(private bellService: BellService) {}

  @Get()
  getAll(@Query(new JoiValidationPipe(bellValidations.getAll)) query) {
    return this.bellService.getAll({}, query.page, query.limit);
  }

  @Get(':id')
  getOne(@Param(new JoiValidationPipe(bellValidations.get)) params) {
    return this.bellService.getOne(params.id);
  }

  @Post()
  create(@Body(new JoiValidationPipe(bellValidations.create)) body) {
    return this.bellService.create(body);
  }

  @Patch(':id')
  update(
    @Param(new JoiValidationPipe(bellValidations.update)) params,
    @Body(new JoiValidationPipe(bellValidations.update)) body,
  ) {
    return this.bellService.update(params.id, body);
  }

  @Delete(':id')
  delete(@Param(new JoiValidationPipe(bellValidations.delete)) params) {
    return this.bellService.delete(params.id);
  }
}
