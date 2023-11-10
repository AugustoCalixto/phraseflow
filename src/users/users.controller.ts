import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('subscribe')
  subscribeToLesson(
    @Body('userId') userId: number,
    @Body('lessonId') lessonId: number,
  ) {
    return this.usersService.subscribeToLesson(userId, lessonId);
  }

  @Get('history/:userId')
  getUserLessonsHistory(@Param('userId') userId: string) {
    return this.usersService.getUserLessonsHistory(+userId);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.usersService.login(email, password);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
