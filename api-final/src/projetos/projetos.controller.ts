import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './projeto.entity';

@ApiTags('projetos')
@Controller('projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperar todos os projetos' })
  @ApiResponse({ 
    status: 200, 
    description: 'Projetos recuperados com sucesso.',
    schema: {
      example: [
        { id: 1, nome: 'Projeto 1', descricao: 'Descrição do projeto 1' },
        { id: 2, nome: 'Projeto 2', descricao: 'Descrição do projeto 2' }
      ]
    }
  })
  findAll(): Promise<Projeto[]> {
    return this.projetosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar um projeto pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID do projeto' })
  @ApiResponse({ 
    status: 200, 
    description: 'Projeto recuperado com sucesso.',
    schema: {
      example: { id: 1, nome: 'Projeto 1', descricao: 'Descrição do projeto 1' }
    }
  })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado.' })
  async findOne(@Param('id') id: number): Promise<Projeto> {
    return this.projetosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo projeto' })
  @ApiBody({
    description: 'Dados do novo projeto',
    schema: {
      example: { nome: 'Novo Projeto', descricao: 'Descrição do novo projeto' }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Projeto criado com sucesso.',
    schema: {
      example: { id: 1, nome: 'Novo Projeto', descricao: 'Descrição do novo projeto' }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  async create(@Body() createProjetoDto: CreateProjetoDto): Promise<Projeto> {
    return this.projetosService.create(createProjetoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um projeto pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID do projeto' })
  @ApiBody({
    description: 'Dados para atualização do projeto',
    schema: {
      example: { nome: 'Projeto Atualizado', descricao: 'Descrição atualizada do projeto' }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Projeto atualizado com sucesso.',
    schema: {
      example: { id: 1, nome: 'Projeto Atualizado', descricao: 'Descrição atualizada do projeto' }
    }
  })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  async update(@Param('id') id: number, @Body() updateProjetoDto: UpdateProjetoDto): Promise<Projeto> {
    return this.projetosService.update(id, updateProjetoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um projeto pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID do projeto' })
  @ApiResponse({ 
    status: 200, 
    description: 'Projeto removido com sucesso.',
    schema: {
      example: { message: 'Projeto 1 removido com sucesso.' }
    }
  })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado.' })
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.projetosService.remove(id);
    return { message: `Projeto ${id} removido com sucesso.` }; 
  }
}
