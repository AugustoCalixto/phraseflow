import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonsService extends PrismaService {
  async create(createLessonDto: CreateLessonDto) {
    const questions = [];
    if (createLessonDto.questions.length > 0) {
      for (const question of createLessonDto.questions) {
        const newQuestion = await this.question.create({
          data: {
            question: question.question,
            answer: question.answer,
            type: question.type,
          },
        });
        questions.push({
          questionId: newQuestion.id,
        });
      }
    }

    const newLesson = await this.lesson.create({
      data: {
        title: createLessonDto.title,
        content: createLessonDto.content,
        language_id: createLessonDto.language_id,
        lessonQuestions: {
          create: questions,
        },
      },
    });
    return newLesson;
  }

  async findAll() {
    const lessons = await this.lesson.findMany({
      include: {
        lessonQuestions: {
          include: {
            question: true,
          },
        },
      },
    });
    return lessons;
  }

  async findAllUserLessons(userId: number) {
    const lessons = await this.lesson.findMany({
      include: {
        lessonQuestions: {
          include: {
            question: true,
          },
        },
      },
    });
    return lessons;
  }

  async findOne(id: number) {
    const lesson = await this.lesson.findUnique({
      where: { id },
      include: {
        lessonQuestions: {
          include: {
            question: true,
          },
        },
      },
    });
    return lesson;
  }

  async getUserLessonProgress(userId: number, lessonId: number) {
    const userLessonProgress = await this.userLessonProgress.findFirst({
      where: {
        userId,
        lessonId,
      },
    });
    return userLessonProgress;
  }

  async createUserLessonHistory(userId: number, lessonId: number) {
    const userLessonHistory = await this.lessonHistory.create({
      data: {
        userId,
        lessonId,
      },
    });
    return userLessonHistory;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
