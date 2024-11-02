import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from './comentario.entity';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentariosRepository: Repository<Comentario>,
  ) {}

  async findAll(): Promise<Comentario[]> {
    return this.comentariosRepository.find({ relations: ['tarefa'] });
  }

  async findOne(id: number): Promise<Comentario> {
    const comentario = await this.comentariosRepository.findOne({ where: { id }, relations: ['tarefa'] });
    if (!comentario) {
      throw new NotFoundException('Comentário não encontrado');
    }
    return comentario;
  }

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const comentario = this.comentariosRepository.create(createComentarioDto);
    return this.comentariosRepository.save(comentario);
  }

  async update(id: number, updateComentarioDto: UpdateComentarioDto): Promise<Comentario> {
    const comentario = await this.findOne(id);
    Object.assign(comentario, updateComentarioDto);
    return this.comentariosRepository.save(comentario);
  }

  async remove(id: number): Promise<void> {
    const comentario = await this.findOne(id);
    await this.comentariosRepository.remove(comentario);
  }
}
