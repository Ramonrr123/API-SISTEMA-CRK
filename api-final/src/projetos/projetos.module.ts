 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { Projeto } from './projeto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projeto])],
  controllers: [ProjetosController],
  providers: [ProjetosService],
})
export class ProjetosModule {}
