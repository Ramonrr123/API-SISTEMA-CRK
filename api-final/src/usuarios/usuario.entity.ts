import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tarefa } from '../tarefas/tarefa.entity';
import * as bcrypt from 'bcrypt';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome_usuario: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criado_em: Date;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.usuario)
  tarefas: Tarefa[];

  
  async hashSenha() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
}
