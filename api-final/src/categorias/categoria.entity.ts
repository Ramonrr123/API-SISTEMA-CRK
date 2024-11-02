import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tarefa } from '../tarefas/tarefa.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criado_em: Date;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.categoria)
  tarefas: Tarefa[];
}
