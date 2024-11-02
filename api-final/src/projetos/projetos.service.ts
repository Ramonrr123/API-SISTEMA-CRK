import { Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projeto } from './projeto.entity';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetosService {
  constructor(
    @InjectRepository(Projeto)
    private projetosRepository: Repository<Projeto>,
  ) {}

  findAll(): Promise<Projeto[]> {
    return this.projetosRepository.find({ relations: ['tarefas'] });
  }

  async findOne(id: number): Promise<Projeto> {
    const projeto = await this.projetosRepository.findOne({ where: { id }, relations: ['tarefas'] });

    if (!projeto) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado`); 
    }

    return projeto;
  }

  create(createProjetoDto: CreateProjetoDto): Promise<Projeto> {
    const projeto = this.projetosRepository.create(createProjetoDto);
    return this.projetosRepository.save(projeto);
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto): Promise<Projeto> {
    await this.projetosRepository.update(id, updateProjetoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.projetosRepository.delete(id);
  }
}
