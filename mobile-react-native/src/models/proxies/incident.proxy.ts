//#region Imports

import { BaseCrudProxy } from './base.proxy';
import { OngProxy } from './ong.proxy';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um incidente
 */
export interface IncidentProxy extends BaseCrudProxy {

  /**
   * O titulo desse incidente
   */
  title: string;

  /**
   * A descrição desse caso
   */
  description: string;

  /**
   * O valor para ajudar esse caso
   */
  value: number;

  /**
   * A identificação da ong na qual esse caso pertence
   */
  ongId: number;

  /**
   * As informações da ong na qual esse caso pertence
   */
  ong: OngProxy;

}
