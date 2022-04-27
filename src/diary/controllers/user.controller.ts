import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(@Req() request) {
    return this.userService.findAll();
  }

  @Get('/createGroup')
  createGroup(@Req() request) {
    return this.userService.createGroup();
  }

  @Get('/createRole')
  createRole(@Req() request) {
    return this.userService.createRole();
  }

  @Get('/createUser')
  createUser(@Req() request) {
    return this.userService.createUser();
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
