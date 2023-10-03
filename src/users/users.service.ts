import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService extends PrismaService {
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.user.create({
      data: createUserDto,
    });
    return newUser;
  }

  async subscribeToLesson(userId: number, lessonId: number, progress: number) {
    const userLessonProgress = await this.userLessonProgress.create({
      data: {
        userId,
        lessonId,
        progress,
      },
    });
    return userLessonProgress;
  }

  async getUserLessonsHistory(userId: number) {
    const userLessonsHistory = await this.lessonHistory.findMany({
      where: {
        userId,
      },
      include: {
        lesson: true,
      },
    });
    return userLessonsHistory;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
