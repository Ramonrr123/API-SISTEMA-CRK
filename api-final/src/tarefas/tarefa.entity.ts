import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { Comentario } from '../comentarios/comentario.entity';
import { Projeto } from '../projetos/projeto.entity';

@Entity('tarefas')
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ default: 'Pendente' })
  status: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.tarefas, { onDelete: 'CASCADE' })
  usuario: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.tarefas, { onDelete: 'SET NULL' })
  categoria: Categoria;

  @OneToMany(() => Comentario, (comentario) => comentario.tarefa, { cascade: true })
  comentarios: Comentario[];

  @ManyToOne(() => Projeto, (projeto) => projeto.tarefas, { onDelete: 'SET NULL' })
  projeto: Projeto;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criado_em: Date;
}
