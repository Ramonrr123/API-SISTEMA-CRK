 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './tarefa.entity';
import { TarefasService } from './tarefas.service';
import { TarefasController } from './tarefas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa])],
  providers: [TarefasService],
  controllers: [TarefasController],
})
export class TarefasModule {}
