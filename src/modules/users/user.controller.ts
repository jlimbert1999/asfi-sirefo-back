import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { PaginationDto } from 'src/modules/common';

import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserService } from './user.service';
import { Role } from '../auth/decorators';
import { UserRole } from './domain';

@Role(UserRole.ADMIN)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(@Query() params: PaginationDto) {
    return this.userService.findAll(params);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Patch(':id')
  update(@Param('id') userId: string, @Body() job: UpdateUserDto) {
    return this.userService.update(+userId, job);
  }
}
