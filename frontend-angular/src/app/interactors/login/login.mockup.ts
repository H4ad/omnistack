//#region Imports

import { LoginPayload } from '../../models/payloads/login.payload';
import { TokenProxy } from '../../models/proxies/token.proxy';
import { UserProxy } from '../../models/proxies/user.proxy';
import { AsyncResult } from '../../services/http-async/http-async.service';

//#endregion

/**
 * Método que realiza o login do usuário
 *
 * @param payload As informações para realizar o login
 */
export async function getPerformLoginMockup(payload: LoginPayload): Promise<AsyncResult<TokenProxy>> {
  return {
    success: {
      token: 'Bearer token',
      expiresAt: new Date().toISOString(),
    },
  };
}

/**
 * Método que retorna as informações do usuário atualmente logado
 */
export async function getUserInfoMockup(): Promise<AsyncResult<UserProxy>> {
  return {
    success: {
      email: 'email@email.com',
      roles: 'user',
      id: 1,
      isActive: true,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  };
}
