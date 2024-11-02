import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProjetoDto {
  @IsNotEmpty({ message: 'O nome do projeto não pode ser vazio.' })
  @IsString({ message: 'O nome do projeto deve ser uma string.' })
  @Length(3, 255, { message: 'O nome do projeto deve ter entre 3 e 255 caracteres.' })
  nome: string;
}
