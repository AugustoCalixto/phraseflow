import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('create')
  create(@Body() createQuestionDto: CreateQuestionDto[]) {
    return this.questionsService.create(createQuestionDto);
  }

  @Post('add-questions-to-lesson/:lessonId')
  addQuestionsToLesson(
    @Param('lessonId') lessonId: string,
    @Body() questionIds: string[],
  ) {
    console.log({ questionIds });
    return this.questionsService.addQuestionsToLesson(+lessonId, questionIds);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
