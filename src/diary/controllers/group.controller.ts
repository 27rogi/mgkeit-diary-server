import { groupValidations } from './../../validations/group.validation';
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
import { GroupService } from '../services/group.service';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  getAll(@Query(new JoiValidationPipe(groupValidations.getAll)) query) {
    return this.groupService.getAll({}, query.page, query.limit);
  }

  @Get(':id')
  getOne(@Param(new JoiValidationPipe(groupValidations.get)) params) {
    return this.groupService.getOne(params.id);
  }

  @Post()
  create(@Body(new JoiValidationPipe(groupValidations.create)) body) {
    return this.groupService.create(body);
  }

  @Patch(':id')
  update(
    @Param(new JoiValidationPipe(groupValidations.update)) params,
    @Body(new JoiValidationPipe(groupValidations.update)) body,
  ) {
    return this.groupService.update(params.id, body);
  }

  @Delete(':id')
  delete(@Param(new JoiValidationPipe(groupValidations.delete)) params) {
    return this.groupService.delete(params.id);
  }
}
