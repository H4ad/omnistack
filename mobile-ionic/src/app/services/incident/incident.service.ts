//#region Imports

import { Injectable } from '@angular/core';

import { IncidentInteractor } from '../../interactors/incident/incident.interactor';
import { IncidentProxy } from '../../models/proxies/incident.proxy';

//#endregion

/**
 * A classe que representa o serviço que lida com as regras de neǵocio dos incidenes
 */
@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly interactor: IncidentInteractor,
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
    return await this.interactor.getIncidents(limit, page);
  }

}
