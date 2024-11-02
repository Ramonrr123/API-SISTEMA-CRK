import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tarefa } from 'src/tarefas/tarefa.entity';

@Entity('comentarios')
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  texto: string;

  @ManyToOne(() => Tarefa, (tarefa) => tarefa.comentarios, { onDelete: 'CASCADE' })
  tarefa: Tarefa;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criado_em: Date;
}
