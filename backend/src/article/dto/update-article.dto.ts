import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PartialUpdateArticleDto extends PartialType(CreateArticleDto) {}
export class UpdateArticleDto  {
    @IsNotEmpty ()
    @IsNumber()
    id: number;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => PartialUpdateArticleDto)
    data: PartialUpdateArticleDto;
}
