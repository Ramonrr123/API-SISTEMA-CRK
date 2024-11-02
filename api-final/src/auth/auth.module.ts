import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from '../usuarios/usuarios.module'; 
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller'; 

@Module({
  imports: [
    UsuariosModule, 
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'segredoJWT', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AuthController], 
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
