import { IsOptional } from 'class-validator';

export class UpdateTarefaDto {
  @IsOptional()
  titulo?: string;

  @IsOptional()
  descricao?: string;

  @IsOptional()
  status?: string;
}
