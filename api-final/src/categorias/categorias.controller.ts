import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de categorias retornada com sucesso.',
    schema: {
      example: [
        { id: 1, nome: 'Categoria A' },
        { id: 2, nome: 'Categoria B' }
      ]
    }
  })
  async findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma categoria pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID da categoria' })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoria encontrada com sucesso.',
    schema: {
      example: { id: 1, nome: 'Categoria A' }
    }
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  async findOne(@Param('id') id: number) {
    return this.categoriasService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova categoria' })
  @ApiBody({
    description: 'Dados da nova categoria',
    type: CreateCategoriaDto,
    examples: {
      default: {
        value: { nome: 'Nova Categoria' },
      },
    },
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Categoria criada com sucesso.',
    schema: {
      example: { id: 1, nome: 'Nova Categoria' }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma categoria existente' })
  @ApiParam({ name: 'id', required: true, description: 'ID da categoria' })
  @ApiBody({
    description: 'Dados para atualização da categoria',
    type: UpdateCategoriaDto,
    examples: {
      default: {
        value: { nome: 'Categoria Atualizada' },
      },
    },
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoria atualizada com sucesso.',
    schema: {
      example: { id: 1, nome: 'Categoria Atualizada' }
    }
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  async update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma categoria pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID da categoria' })
  @ApiResponse({ 
    status: 200, 
    description: 'Categoria removida com sucesso.',
    schema: {
      example: { message: 'Categoria 1 removida com sucesso.' }
    }
  })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  async remove(@Param('id') id: number) {
    await this.categoriasService.remove(id);
    return { message: `Categoria ${id} removida com sucesso.` };
  }
}
