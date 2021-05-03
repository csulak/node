import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UserInterface } from './interfaces/UserInterface';
import { LoginUserDto } from './dto/login-user-dto';
import { UserCreatedDto } from './dto/user-created-dto';
import { Response } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'Returns user list',
  })
  @Get('/list')
  getUsers(): Promise<UserInterface[]> {
    return this.userService.getUsers();
  }

  @ApiOperation({
    summary: 'Return info related for the user-id specified',
  })
  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserInterface> {
    return this.userService.getUser(id);
  }

  @ApiOperation({
    summary: 'Creates new User',
  })
  @Post()
  createUser(@Body() user: CreateUserDto): Promise<UserCreatedDto> {
    return this.userService.createUser(user);
  }

  @ApiOperation({
    summary: 'User Login: Returns JWT Token and set cookie named "jwt_user"',
  })
  @Post('login')
  login(
    @Body() loginUser: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const userCookie = this.userService.login(loginUser);

    response.cookie('jwt_user', userCookie);

    return userCookie;
  }
}
