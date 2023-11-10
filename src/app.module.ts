import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuestionsModule } from './questions/questions.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { InteractionsModule } from './interactions/interactions.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [UsersModule, LessonsModule, QuestionsModule, PrismaModule, InteractionsModule, LanguagesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
