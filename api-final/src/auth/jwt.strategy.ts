import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtPayload } from './jwt.payload'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'segredoJWT', 
    });
  }

 
  async validate(payload: JwtPayload) {
   
    const usuario = await this.usuariosService.findOne(payload.sub);

   
    if (!usuario) {
      throw new UnauthorizedException('Usuário não autorizado ou inexistente.');
    }

    return usuario;
  }
}
