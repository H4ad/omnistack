//#region Imports

import { BaseCrudProxy } from './base.proxy';
import { UserProxy } from './user.proxy';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre uma ong
 */
export interface OngProxy extends BaseCrudProxy {

  /**
   * O nome dessa ong
   */
  name: string;

  /**
   * A cidade na qual está localizada essa ong
   */
  city: string;

  /**
   * O estado na qual está localizada essa ong
   */
  uf: string;

  /**
   * O número de WhatsApp para entrar em contato com essa ong
   */
  whatsapp: string;

  /**
   * A identificação do usuário que controla essa ong
   */
  userId: number;

  /**
   * As informações sobre o usuário
   */
  user?: UserProxy;


}
