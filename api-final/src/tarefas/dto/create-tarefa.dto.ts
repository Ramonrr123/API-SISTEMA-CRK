import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTarefaDto {
  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  descricao?: string;

  @IsOptional()
  status?: string;
}
