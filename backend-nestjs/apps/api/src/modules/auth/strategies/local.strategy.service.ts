//#region Imports

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';

//#endregion

/**
 * A classe que representa a estratégia usada para fazer validação local ( email e senha )
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  //#region Constructors

  /**
   * Construtor padrão
   */
  constructor(
    private readonly authService: AuthService,
  ) {
    super();
  }

  //#endregion

  /**
   * Método que realiza a validação de um usuário pelo email e senha
   *
   * @param username O email do usuário
   * @param password A senha do usuário
   *
   * @note NÃO trocar o nome do parâmetros, isso invalida a funcionalidade do método
   */
  public async validate(username: string, password: string): Promise<any> {
    return await this.authService.authenticate({ username, password });
  }
}
