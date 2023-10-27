import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('create')
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Post('update-history')
  createUserLessonHistory(
    @Body('userId') userId: number,
    @Body('lessonId') lessonId: number,
  ) {
    return this.lessonsService.createUserLessonHistory(userId, lessonId);
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get('info/:id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Get('user/:userId')
  findAllUserLessons(@Param('userId') userId: string) {
    return this.lessonsService.findAllUserLessons(+userId);
  }

  @Get('progress/:userId/:lessonId')
  getUserLessonProgress(
    @Param('userId') userId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonsService.getUserLessonProgress(+userId, +lessonId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
