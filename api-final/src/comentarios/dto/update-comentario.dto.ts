import { IsOptional, IsString } from 'class-validator';

export class UpdateComentarioDto {
  @IsOptional()
  @IsString({ message: 'O texto do comentário deve ser uma string.' })
  texto?: string;
}
