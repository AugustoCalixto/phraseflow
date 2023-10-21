import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post()
  create(
    @Body('user_id') userId: number,
    @Body('question_id') question_id: string,
    @Body('user_answer') user_answer: string,
  ) {
    return this.interactionsService.create(userId, question_id, user_answer);
  }

  @Delete('reset-lesson-progress/:user_id/:lesson_id')
  resetProgress(
    @Param('user_id') userId: string,
    @Param('lesson_id') lessonId: string,
  ) {
    return this.interactionsService.resetLessonProgress(+userId, +lessonId);
  }

  @Get('lesson-progress/:user_id/:lesson_id')
  lessonProgress(
    @Param('user_id') userId: string,
    @Param('lesson_id') lessonId: string,
  ) {
    return this.interactionsService.showLessonProgress(+userId, +lessonId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInteractionDto: UpdateInteractionDto,
  ) {
    return this.interactionsService.update(+id, updateInteractionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interactionsService.remove(+id);
  }
}
