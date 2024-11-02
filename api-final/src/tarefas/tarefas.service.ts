import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarefa } from './tarefa.entity';

@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(Tarefa)
    private tarefasRepository: Repository<Tarefa>,
  ) {}

  async create(tarefaData: Partial<Tarefa>): Promise<Tarefa> {
    const tarefa = this.tarefasRepository.create(tarefaData);
    return this.tarefasRepository.save(tarefa);
  }

  async findAll(): Promise<Tarefa[]> {
    return this.tarefasRepository.find({ relations: ['usuario', 'projeto'] });
  }

  async findOne(id: number): Promise<Tarefa> {
    const tarefa = await this.tarefasRepository.findOne({
      where: { id },
      relations: ['usuario', 'projeto'],
    });
    if (!tarefa) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return tarefa;
  }

  async update(id: number, tarefaData: Partial<Tarefa>): Promise<Tarefa> {
    await this.tarefasRepository.update(id, tarefaData);
    return this.tarefasRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.tarefasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada para remoção`);
    }
    return { message: `Tarefa com ID ${id} removida com sucesso` };
  }
}
