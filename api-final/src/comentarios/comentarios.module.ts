 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { Comentario } from './comentario.entity';
import { TarefasModule } from 'src/tarefas/tarefas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario]), TarefasModule],
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}
