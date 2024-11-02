 
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tarefa } from 'src/tarefas/tarefa.entity';

@Entity('projetos')
export class Projeto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criado_em: Date;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.projeto)
  tarefas: Tarefa[];
}
