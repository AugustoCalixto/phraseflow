import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService extends PrismaService {
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.user.create({
      data: createUserDto,
    });
    return newUser;
  }

  async subscribeToLesson(userId: number, lessonId: number) {
    const userLessonProgress = await this.userLessons.create({
      data: {
        userId,
        lessonId,
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

  async findOne(id: number) {
    try {
      const user = await this.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
