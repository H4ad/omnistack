//#region Imports

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../user/entities/user.entity';
import { IJwtPayload } from '../models/jwt.payload';
import { AuthService } from '../services/auth.service';

//#endregion

/**
 * A classe que representa a estrategia que lida com o JWT
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    protected readonly auth: AuthService,
    protected readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET_KEY'),
      jsonWebTokenOptions: {
        expiresIn: config.getOrThrow<string>('JWT_EXPIRES_IN'),
      },
    });
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna as informações que devem ser serializadas
   *
   * @param jwtPayload As informações obtidas do token
   */
  public async validate(jwtPayload: IJwtPayload): Promise<Partial<UserEntity>> {
    return await this.auth.validateUserByPayload(jwtPayload);
  }

  //#endregion

}
