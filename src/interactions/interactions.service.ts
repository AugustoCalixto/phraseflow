import { HttpException, Injectable } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InteractionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: number, question_id: string, user_answer: string) {
    const question = await this.prisma.question.findUnique({
      where: {
        id: question_id,
      },
    });

    if (!question) {
      throw new HttpException('Question not found', 404);
    }

    const right_answer = question.answer;
    console.log(right_answer, user_answer);
    if (right_answer == user_answer) {
      const lesson = await this.prisma.lesson.findFirst({
        where: {
          lessonQuestions: {
            some: {
              questionId: question_id,
            },
          },
        },
      });

      let lessonProgress = await this.prisma.lessonProgress.findFirst({
        where: {
          AND: [
            {
              lessonId: lesson.id,
              userId: user,
            },
          ],
        },
      });

      if (!lessonProgress) {
        lessonProgress = await this.prisma.lessonProgress.create({
          data: {
            lessonId: lesson.id,
            userId: user,
            progress: 10,
          },
        });
      } else {
        lessonProgress = await this.prisma.lessonProgress.update({
          where: {
            id: lessonProgress.id,
          },
          data: {
            progress: lessonProgress.progress + 10,
          },
        });
      }

      console.log({ lessonProgress });
      return lessonProgress;
    }
  }

  async resetLessonProgress(user: number, lesson_id: number) {
    const lessonProgress = await this.prisma.lessonProgress.findFirst({
      where: {
        AND: [
          {
            lessonId: lesson_id,
            userId: user,
          },
        ],
      },
    });

    if (!lessonProgress) {
      throw new HttpException('Lesson progress not found', 404);
    }

    const resetLessonProgress = await this.prisma.lessonProgress.update({
      where: {
        id: lessonProgress.id,
      },
      data: {
        progress: 0,
      },
    });

    return resetLessonProgress;
  }

  async showLessonProgress(user: number, lesson_id: number) {
    try {
      const lessonProgress = await this.prisma.lessonProgress.findFirst({
        where: {
          AND: [
            {
              lessonId: lesson_id,
              userId: user,
            },
          ],
        },
        include: {
          lesson: {
            include: {
              lessonQuestions: {
                include: {
                  question: true,
                },
              },
            },
          },
        },
      });

      return lessonProgress;
    } catch (error) {
      console.log(error);
      throw new HttpException('Lesson progress not found', 404);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} interaction`;
  }

  update(id: number, updateInteractionDto: UpdateInteractionDto) {
    return `This action updates a #${id} interaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} interaction`;
  }
}
