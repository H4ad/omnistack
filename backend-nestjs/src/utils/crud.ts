//#region Imports

import { BaseCrudProxy } from '../common/base-crud.proxy';
import { BaseEntity } from '../common/base-entity';

//#endregion

/**
 * O tipo da resposta que irá retornar as entidades convertidas em proxy
 */
export type CrudProxy<T> = T[] | T;

/**
 * O tipo usado para especificar que é uma classe que possui um construtor
 */
export type CrudClassProxy<T, K> = new(item: K) => T;

/**
 * Método que mapeia as entidades buscadas pelo crud e retorna uma versão com o Proxy do objeto
 *
 * @param classInstance A classe proxy usada para limpar quaisquer propriedades que não devam ser enviadas
 * @param data As informações que precisam ser mapeadas
 */
export function mapCrud<T extends BaseCrudProxy, K extends BaseEntity>(classInstance: CrudClassProxy<T, K>, data: CrudProxy<K>): CrudProxy<T> {
  if (Array.isArray(data))
    return data.map(item => new classInstance(item));

  return new classInstance(data);
}
