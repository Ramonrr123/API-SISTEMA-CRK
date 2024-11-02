
import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MaxLength(100)
  nome_usuario: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senha: string;
}
