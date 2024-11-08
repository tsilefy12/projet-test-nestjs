import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class FindOneArticleDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    id: number;
}