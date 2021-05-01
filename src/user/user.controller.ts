import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UserInterface } from './interfaces/UserInterface';
import { LoginUserDto } from './dto/login-user-dto';
import { UserCreatedDto } from './dto/user-created-dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/list')
  getUsers(): Promise<UserInterface[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserInterface> {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<UserCreatedDto> {
    return this.userService.createUser(user);
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDto) {
    return this.userService.login(loginUser);
  }
}
