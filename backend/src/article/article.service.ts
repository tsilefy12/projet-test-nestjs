import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  async create(createArticleDto: CreateArticleDto) {
    const article = await this.prisma.article.create({
      data: createArticleDto,
    });
    return article;
  }

  async findAll() {
    return this.prisma.article.findMany();
  }

 async findOne(id: number) {
    const article = this.prisma.article.findUnique({
      where: { id },
    });
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.findOne(id);
    const updatedArticle = await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
    return updatedArticle;
}


  async remove(id: number) {
    await this.findOne(id);
    const article = await this.prisma.article.delete({
      where: { id },
    });
    return article;
  }
}
