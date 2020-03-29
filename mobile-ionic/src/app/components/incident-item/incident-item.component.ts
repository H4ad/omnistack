//#region Imports

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { IncidentProxy } from '../../models/proxies/incident.proxy';

//#endregion

/**
 * A classe que representa o componente que exibe as informações de um caso/incidente
 */
@Component({
  selector: 'bth-incident-item',
  templateUrl: './incident-item.component.html',
  styleUrls: ['./incident-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentItemComponent {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor() { }

  //#endregion

  //#region Inputs

  /**
   * As informações de conteúdo desse componente
   */
  @Input()
  public content: IncidentProxy;

  //#endregion

  //#region Outputs

  /**
   * O evento lançado quando o usuário clica no botão de detalhes
   */
  @Output()
  public onClickDetailEvent: EventEmitter<IncidentProxy> = new EventEmitter<IncidentProxy>();

  //#endregion

}
