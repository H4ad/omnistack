//#region Imports

import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { IncidentProxy } from '../../models/proxies/incident.proxy';

//#endregion

/**
 * A classe que representa a página que exibe as informações de um incidente
 */
@Component({
  selector: 'bth-incident-details',
  templateUrl: './incident-details.page.html',
  styleUrls: ['./incident-details.page.scss'],
})
export class IncidentDetailsPage {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer,
    private readonly nav: NavController,
  ) {
    this.incident = this.router.getCurrentNavigation().extras?.state?.incident;

    if (!this.incident)
      return void this.router.navigateByUrl('/incidents');

    const message = `Olá APAD, estou entrando em contato pois gostaria de ajudar no caso "${ this.incident.title }" com o valor de R$ ${ this.incident.value.toFixed(2) } reais.`;
    const subject = `Herói do caso: ${ this.incident.title }`;

    this.whatsappDeepLink = this.sanitizer.bypassSecurityTrustUrl(`whatsapp://send?text=${ encodeURI(message) }&phone=${ this.incident.ong.whatsapp }`);
    this.emailDeepLink = this.sanitizer.bypassSecurityTrustUrl(`mailto:${ this.incident.ong.email }?subject=${ encodeURI(subject) }&body=${ encodeURI(message) }`);
  }

  //#endregion

  //#region Public Properties

  /**
   * As informações do incidente que está sendo exibido
   */
  public incident: IncidentProxy;

  /**
   * O url para redirecionar o Whatsapp
   */
  public whatsappDeepLink: SafeUrl;

  /**
   * O url para redirecionar o gerenciador de e-mail
   */
  public emailDeepLink: SafeUrl;

  //#endregion

  //#region Public Methods

  /**
   * Método que é executado ao clicar em voltar
   */
  public onClickArrowBack(): void {
    return void this.nav.back();
  }

  //#endregion

}
