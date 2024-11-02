import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return await this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return usuario;
  }

  async findById(id: number): Promise<Usuario> { 
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | undefined> { 
    const usuario = await this.usuariosRepository.findOne({ where: { email } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com o e-mail ${email} não encontrado.`);
    }
    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const novoUsuario = this.usuariosRepository.create(createUsuarioDto);
      await novoUsuario.hashSenha(); 
      return await this.usuariosRepository.save(novoUsuario);
    } catch (error) {
      throw new BadRequestException('Erro ao criar usuário: ' + error.message);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioExistente = await this.findOne(id);
    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    await this.usuariosRepository.update(id, updateUsuarioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    await this.usuariosRepository.delete(id);
  }
}
