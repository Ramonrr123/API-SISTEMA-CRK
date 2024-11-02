import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@ApiTags('comentarios')
@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperar todos os comentários' })
  @ApiResponse({ 
    status: 200, 
    description: 'Comentários recuperados com sucesso.',
    schema: {
      example: [
        { id: 1, texto: 'Este é um comentário.', id_tarefa: 1 },
        { id: 2, texto: 'Outro comentário interessante.', id_tarefa: 2 }
      ]
    }
  })
  async findAll() {
    return this.comentariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar um comentário pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID do comentário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Comentário recuperado com sucesso.',
    schema: {
      example: { id: 1, texto: 'Este é um comentário.', id_tarefa: 1 }
    }
  })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado.' })
  async findOne(@Param('id') id: number) {
    return this.comentariosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo comentário' })
  @ApiBody({
    description: 'Dados do novo comentário',
    type: CreateComentarioDto,
    examples: {
      default: {
        value: { texto: 'Este é um novo comentário.', id_tarefa: 1 },
      },
    },
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Comentário criado com sucesso.',
    schema: {
      example: { id: 1, texto: 'Este é um novo comentário.', id_tarefa: 1 }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  async create(@Body() createComentarioDto: CreateComentarioDto) {
    return this.comentariosService.create(createComentarioDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um comentário pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID do comentário' })
  @ApiBody({
    description: 'Dados para atualização do comentário',
    type: UpdateComentarioDto,
    examples: {
      default: {
        value: { texto: 'Este é um comentário atualizado.', id_tarefa: 1 },
      },
    },
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Comentário atualizado com sucesso.',
    schema: {
      example: { id: 1, texto: 'Este é um comentário atualizado.', id_tarefa: 1 }
    }
  })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  async update(@Param('id') id: number, @Body() updateComentarioDto: UpdateComentarioDto) {
    return this.comentariosService.update(id, updateComentarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um comentário pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID do comentário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Comentário removido com sucesso.',
    schema: {
      example: { message: 'Comentário 1 removido com sucesso.' }
    }
  })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado.' })
  async remove(@Param('id') id: number) {
    await this.comentariosService.remove(id);
    return { message: `Comentário ${id} removido com sucesso.` }; 
  }
}
