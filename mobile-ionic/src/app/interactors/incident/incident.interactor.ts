//#region Imports

import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { getFakeListIncidents, IncidentProxy } from '../../models/proxies/incident.proxy';
import { HttpAsyncService } from '../../services/http-async/http-async.service';

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
  constructor(
    private readonly http: HttpAsyncService,
  ) { }

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

    const url = `/incidents?limit=${ limit }&page=${ page }&relations=ong`;
    const { success, error, headers } = await this.http.getWithHeaders<IncidentProxy[]>(url);

    if (error)
      return [0, []];

    const totalCount = headers.get('x-total-count');

    return [Number(totalCount), success];
  }

  //#endregion

}
