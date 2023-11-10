import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LanguagesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createLanguageDto: CreateLanguageDto) {
    return 'This action adds a new language';
  }

  async findAll() {
    const languages = await this.prisma.language.findMany();
    return languages;
  }

  findOne(id: number) {
    return `This action returns a #${id} language`;
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return `This action updates a #${id} language`;
  }

  remove(id: number) {
    return `This action removes a #${id} language`;
  }
}
