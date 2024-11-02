import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'O nome da categoria não pode ser vazio.' })
  @IsString({ message: 'O nome da categoria deve ser uma string.' })
  nome: string;
}
