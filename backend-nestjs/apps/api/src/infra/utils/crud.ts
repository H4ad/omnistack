//#region Imports

import { BaseCrudProxy } from '../../common/base-crud.proxy';
import { BaseEntity } from '../../common/base-entity';

//#endregion

export type CrudProxy<T> = T[] | T;

export type CrudClassProxy<T, K> = new(item: K) => T;

export function mapCrud<T extends BaseCrudProxy, K extends BaseEntity>(classInstance: CrudClassProxy<T, K>, data: CrudProxy<K>): CrudProxy<T> {
  if (Array.isArray(data))
    return data.map(item => new classInstance(item));

  return new classInstance(data);
}
