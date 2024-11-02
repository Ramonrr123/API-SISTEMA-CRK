import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TarefasModule } from './tarefas/tarefas.module';
import { ProjetosModule } from './projetos/projetos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ComentariosModule } from './comentarios/comentarios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306, 
      username: 'root', 
      password: 'root', 
      database: 'gerenciador_tarefas', 
      autoLoadEntities: true, 
      synchronize: true, 
      logging: true, 
      extra: {
        supportBigNumbers: true,
        bigNumberStrings: true,
      },
    }),
    AuthModule,
    UsuariosModule,
    TarefasModule,
    ProjetosModule,
    CategoriasModule,
    ComentariosModule,
  ],
})
export class AppModule {}
