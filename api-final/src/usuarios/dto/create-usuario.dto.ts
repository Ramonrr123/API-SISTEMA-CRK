import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'O nome do usuário não pode ser vazio.' })
  @IsString({ message: 'O nome do usuário deve ser uma string.' })
  nome_usuario: string;

  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senha: string;
}
