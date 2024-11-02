import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TarefasService } from './tarefas.service';
import { Tarefa } from './tarefa.entity';

@ApiTags('tarefas') 
@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  @ApiBody({
    description: 'Dados da nova tarefa',
    schema: {
      example: { titulo: 'Nova Tarefa', descricao: 'Descrição da nova tarefa', concluida: false }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Tarefa criada com sucesso.',
    schema: {
      example: { id: 1, titulo: 'Nova Tarefa', descricao: 'Descrição da nova tarefa', concluida: false }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  create(@Body() tarefa: Partial<Tarefa>) {
    return this.tarefasService.create(tarefa);
  }

  @Get()
  @ApiOperation({ summary: 'Recuperar todas as tarefas' })
  @ApiResponse({ 
    status: 200, 
    description: 'Tarefas recuperadas com sucesso.',
    schema: {
      example: [
        { id: 1, titulo: 'Tarefa 1', descricao: 'Descrição da tarefa 1', concluida: false },
        { id: 2, titulo: 'Tarefa 2', descricao: 'Descrição da tarefa 2', concluida: true }
      ]
    }
  })
  findAll() {
    return this.tarefasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar uma tarefa pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID da tarefa' })
  @ApiResponse({ 
    status: 200, 
    description: 'Tarefa recuperada com sucesso.',
    schema: {
      example: { id: 1, titulo: 'Tarefa 1', descricao: 'Descrição da tarefa 1', concluida: false }
    }
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  findOne(@Param('id') id: number) {
    return this.tarefasService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma tarefa pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID da tarefa' })
  @ApiBody({
    description: 'Dados para atualização da tarefa',
    schema: {
      example: { titulo: 'Tarefa Atualizada', descricao: 'Descrição atualizada da tarefa', concluida: true }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Tarefa atualizada com sucesso.',
    schema: {
      example: { id: 1, titulo: 'Tarefa Atualizada', descricao: 'Descrição atualizada da tarefa', concluida: true }
    }
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  update(@Param('id') id: number, @Body() tarefa: Partial<Tarefa>) {
    return this.tarefasService.update(id, tarefa);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma tarefa pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID da tarefa' })
  @ApiResponse({ 
    status: 200, 
    description: 'Tarefa removida com sucesso.',
    schema: {
      example: { message: 'Tarefa removida com sucesso.' }
    }
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  async remove(@Param('id') id: number) {
    return this.tarefasService.remove(id);
  }
}
