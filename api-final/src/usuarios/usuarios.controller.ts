import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './usuario.entity'; // Certifique-se de que o caminho está correto

@ApiTags('usuarios') 
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @ApiOperation({ summary: 'Recuperar todos os usuários' })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuários recuperados com sucesso.',
    schema: {
      example: [
        { id: 1, nome: 'Usuário 1', email: 'usuario1@example.com' },
        { id: 2, nome: 'Usuário 2', email: 'usuario2@example.com' }
      ]
    }
  })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar um usuário pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID do usuário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário recuperado com sucesso.',
    schema: {
      example: { id: 1, nome: 'Usuário 1', email: 'usuario1@example.com' }
    }
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({
    description: 'Dados do novo usuário',
    schema: {
      example: { nome_usuario: 'Usuário Novo', email: 'usuario_novo@example.com', senha: 'senha123' }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário criado com sucesso.',
    schema: {
      example: { id: 1, nome_usuario: 'Usuário Novo', email: 'usuario_novo@example.com' }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID do usuário' })
  @ApiBody({
    description: 'Dados para atualização do usuário',
    schema: {
      example: { nome_usuario: 'Usuário Atualizado', email: 'usuario_atualizado@example.com', senha: 'senha456' }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário atualizado com sucesso.',
    schema: {
      example: { id: 1, nome_usuario: 'Usuário Atualizado', email: 'usuario_atualizado@example.com' }
    }
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário pelo ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID do usuário' })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário removido com sucesso.',
    schema: {
      example: { message: 'Usuário removido com sucesso.' }
    }
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
