import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProjetoDto {
  @IsOptional()
  @IsString({ message: 'O nome do projeto deve ser uma string.' })
  @Length(3, 255, { message: 'O nome do projeto deve ter entre 3 e 255 caracteres.' })
  nome?: string;
}
