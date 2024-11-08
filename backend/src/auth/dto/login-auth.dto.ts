import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginAuthDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}