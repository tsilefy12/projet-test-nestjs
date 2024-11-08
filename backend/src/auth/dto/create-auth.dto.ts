import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty()
  @IsEmail({}, { message: 'L\'email doit être valide.' })
  @IsNotEmpty({ message: 'L\'email est requis.' })
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  @Matches(/^(?=.*[A-Z])/, { message: 'Le mot de passe doit contenir au moins une majuscule.' })
  @Matches(/^(?=.*[a-z])/, { message: 'Le mot de passe doit contenir au moins une minuscule.' })
  @Matches(/^(?=.*\d)/, { message: 'Le mot de passe doit contenir au moins un chiffre.' })
  @Matches(/^(?=.*[!@#$%^&*])/, { message: 'Le mot de passe doit contenir un caractère spécial.' })
  password: string;
}
