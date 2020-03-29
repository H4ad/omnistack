//#region Imports

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPageInfo } from 'ngx-virtual-scroller';

import { IncidentProxy } from '../../models/proxies/incident.proxy';
import { IncidentService } from '../../services/incident/incident.service';

//#endregion

/**
 * A classe que representa a página que lista os incidentes
 */
@Component({
  selector: 'bth-incidents',
  templateUrl: './incidents.page.html',
  styleUrls: ['./incidents.page.scss'],
})
export class IncidentsPage implements OnInit {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly incidentService: IncidentService,
    private readonly router: Router,
  ) { }

  //#endregion

  //#region Public Properties

  /**
   * O número total de incidentes sem paginação
   */
  public totalIncidents: number = 0;

  /**
   * A página atual
   */
  public currentPage: number = 1;

  /**
   * O limite padrão para a busca de itens
   */
  public defaultLimit: number = 10;

  /**
   * A lista de incidentes
   */
  public listIncidents: IncidentProxy[] = [];

  //#endregion

  //#region Private Properties

  /**
   * Diz se está carregando mais incidentes
   */
  private isLoadingIncidents: boolean = false;

  //#endregion

  //#region LifeCycle Events

  /**
  * Método executado ao iniciar o componente
  */
  public async ngOnInit(): Promise<void> {
    await this.loadIncidents(this.defaultLimit, 1);
  }

  //#endregion

  //#region Public Methods

  /**
   * Metodo que retorna a chave para ser usada para trackear as mudanças da lista
   *
   * @param index O indice atual desse item
   * @param item O item da lista
   */
  public trackByIncidentKey(index: number, item: IncidentProxy): number {
    return item.id;
  }

  /**
   * Método que carrega novos incidentes
   *
   * @param limit O limite de incidentes a ser buscado
   * @param page A página usada para a páginação
   */
  public async loadIncidents(limit: number, page: number): Promise<void> {
    if (this.isLoadingIncidents)
      return;

    this.isLoadingIncidents = true;
    this.currentPage = page;

    const [totalIncidents, newIncidents] = await this.incidentService.getIncidents(limit, page);

    this.totalIncidents = totalIncidents;
    this.listIncidents.push(...newIncidents);

    this.isLoadingIncidents = false;
  }

  /**
   * Método executado ao chegar no final da lista
   *
   * @param event O evento lançado sobre o scroll virtual
   */
  public onReachEnd(event: IPageInfo): void {
    if (event.endIndexWithBuffer !== (this.listIncidents.length - 1))
      return;

    this.loadIncidents(this.defaultLimit, this.currentPage + 1);
  }

  /**
   * Método que é executado quando o usuário quer saber mais sobre um incidente
   *
   * @param incident As informações do incidente
   */
  public async onClickDetails(incident: IncidentProxy): Promise<void> {
    return void await this.router.navigateByUrl(`/incidents/${ incident.id }`, { state: { incident } });
  }

  //#endregion

}
