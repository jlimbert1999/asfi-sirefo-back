import { Controller, Post, Body, Get, Put, Ip } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UpdateMyUserDto } from './dto';
import { GetUserRequest, Public } from './decorators';
import { User } from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @Public()
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }

  @Get()
  checkAuthStatus(@GetUserRequest() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Put()
  updateMyUser(@GetUserRequest("id") id: string, @Body() data: UpdateMyUserDto) {
    return this.authService.updateMyUser(+id, data);
  }
}
