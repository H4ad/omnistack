//#region Imports

import { BaseCrudProxy } from './base.proxy';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um usuário
 */
export interface UserProxy extends BaseCrudProxy {

  /**
   * O e-mail do usuário
   */
  email: string;

  /**
   * As permissões desse usuário
   */
  roles: string;

}
