import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsService extends PrismaService {
  async create(createQuestionDto: CreateQuestionDto[]) {
    const newQuestion = await this.question.createMany({
      data: createQuestionDto,
    });
    return newQuestion;
  }

  async addQuestionsToLesson(lessonId: number, questionIds: string[]) {
    const lesson = await this.lessonQuestions.createMany({
      data: questionIds.map((questionId) => ({
        lessonId,
        questionId,
      })),
    });
    return lesson;
  }

  async findAll() {
    const questions = await this.question.findMany();
    return questions;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const updatedQuestion = await this.question.update({
      where: { id },
      data: updateQuestionDto,
    });
    return updatedQuestion;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
