import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: 'O nome do usuário deve ser uma string.' })
  nome_usuario?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senha?: string;
}
