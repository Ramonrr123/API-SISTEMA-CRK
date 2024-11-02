import { IsNotEmpty, IsString } from 'class-validator';

export class CreateComentarioDto {
  @IsNotEmpty({ message: 'O texto do comentário não pode ser vazio.' })
  @IsString({ message: 'O texto do comentário deve ser uma string.' })
  texto: string;

  @IsNotEmpty({ message: 'O ID da tarefa não pode ser vazio.' })
  id_tarefa: number;
}
