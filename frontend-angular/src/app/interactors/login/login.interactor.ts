//#region Imports

import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { LoginPayload } from '../../models/payloads/login.payload';
import { TokenProxy } from '../../models/proxies/token.proxy';
import { UserProxy } from '../../models/proxies/user.proxy';
import { AsyncResult, HttpAsyncService } from '../../services/http-async/http-async.service';
import { getPerformLoginMockup, getUserInfoMockup } from './login.mockup';

//#endregion

/**
 * A classe que representa o serviço que lida com as requisições HTTP e cache do login
 */
@Injectable({
  providedIn: 'root',
})
export class LoginInteractor {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly http: HttpAsyncService,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que realiza o login do usuário
   *
   * @param payload As informações para realizar o login
   */
  public async performLogin(payload: LoginPayload): Promise<AsyncResult<TokenProxy>> {
    if (environment.isMockupEnabled)
      return getPerformLoginMockup(payload);

    return await this.http.post<TokenProxy>(environment.api.login, payload);
  }

  /**
   * Método que retorna as informações do usuário atualmente logado
   */
  public async getUserInfo(): Promise<AsyncResult<UserProxy>> {
    if (environment.isMockupEnabled)
      return getUserInfoMockup();

    return await this.http.get<UserProxy>(environment.api.userInfo);
  }

  //#endregion

}
