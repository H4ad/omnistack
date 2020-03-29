//#region Imports

import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { getFakeListIncidents, IncidentProxy } from '../../models/proxies/incident.proxy';

//#endregion

/**
 * A classe que representa o interactor que lida com a manipulação dos dados dos incidentes
 */
@Injectable({
  providedIn: 'root',
})
export class IncidentInteractor {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor() { }

  //#endregion

  //#region Public Methods

  /**
   * Método que retorna uma lista de incidentes
   *
   * @param limit O limite de incidentes
   * @param page A página na qual está a páginação
   */
  public async getIncidents(limit: number, page: number): Promise<[number, IncidentProxy[]]> {
    if (environment.isMockupEnabled)
      return [10, getFakeListIncidents(limit)];

    throw new Error('Não implementado ainda.');
  }

  //#endregion

}
