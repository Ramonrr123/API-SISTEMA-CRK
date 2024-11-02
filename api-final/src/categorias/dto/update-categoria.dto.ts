import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoriaDto {
  @IsOptional()
  @IsString({ message: 'O nome da categoria deve ser uma string.' })
  nome?: string;
}
