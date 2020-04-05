//#region Imports

import { Injectable } from '@angular/core';

import { LoginInteractor } from '../../interactors/login/login.interactor';
import { KeysEnum } from '../../models/enums/keys.enum';
import { LoginPayload } from '../../models/payloads/login.payload';
import { getCrudErrors } from '../../utils/functions';

//#endregion

/**
 * A classe que representa o serviço que lida com as regras de negócio do login
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly interactor: LoginInteractor,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que realiza o login do usuário
   *
   * @param payload As informações para realizar o login
   */
  public async performLogin(payload: LoginPayload): Promise<[boolean, string?]> {
    const { success: token, error: tokenErrors } = await this.interactor.performLogin(payload);

    if (tokenErrors)
      return [true, getCrudErrors(tokenErrors)[0]];

    localStorage.setItem(KeysEnum.TOKEN_PROXY, token.token);

    const { success: userInfo, error: userInfoErrors } = await this.interactor.getUserInfo();

    if (userInfoErrors) {
      localStorage.clear();

      return [true, getCrudErrors(userInfoErrors)[0]];
    }

    localStorage.setItem(KeysEnum.USER_PROXY, JSON.stringify(userInfo));

    return [true];
  }

  //#endregion

}
