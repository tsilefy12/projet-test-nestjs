import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FindOneAuthDto {
 @IsNotEmpty()
  email: string;
}