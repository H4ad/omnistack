//#region Imports

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormBuilder, DynamicFormGroup } from 'ngx-dynamic-form-builder';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoginPayload } from '../../models/payloads/login.payload';
import { LoginService } from '../../services/login/login.service';

//#endregion

/**
 * A classe que representa o componente que exibe a página de login
 */
@Component({
  selector: 'bth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    private readonly service: LoginService,
    private readonly router: Router,
  ) {
    this.formGroup = this.formBuilder.group(LoginPayload, {
      username: undefined,
      password: undefined,
    });

    this.customValidateErrorsSubscription = this.formGroup.customValidateErrors.subscribe(allErrors => {
      const errorsKeys = Object.keys(allErrors);

      if (errorsKeys.length === 0)
        return this.errorMessage = void 0;

      this.errorMessage = allErrors[errorsKeys[0]][0];
    });
  }

  //#endregion

  //#region Private Properties

  /**
   * A classe que lida com a validação de formulários
   */
  private readonly formBuilder: DynamicFormBuilder = new DynamicFormBuilder();

  /**
   * A inscrição para escutar os erros
   */
  private readonly customValidateErrorsSubscription: Subscription;

  //#endregion

  //#region Public Properties

  /**
   * A classe que lida com o formulário
   */
  public formGroup: DynamicFormGroup<LoginPayload>;

  /**
   * A mensagem de erro
   */
  public errorMessage?: string;

  /**
   * Diz se está enviando o formulário
   */
  public isSubmittingForm: boolean = false;

  //#endregion

  //#region LifeCycle Events

  /**
   * Método que é executado ao destruir o componente
   */
  public ngOnDestroy(): void {
    this.customValidateErrorsSubscription && this.customValidateErrorsSubscription.unsubscribe();
  }

  //#endregion

  //#region Public Methods

  /**
   * Método que é executado ao enviar o formulário
   */
  public async onSubmit(): Promise<void> {
    if (this.isSubmittingForm)
      return;

    this.isSubmittingForm = true;

    const [loginWasSuccessful, errorMessage] = await this.service.performLogin(this.formGroup.object);

    this.isSubmittingForm = false;

    if (!loginWasSuccessful)
      return void (this.errorMessage = errorMessage);

    await this.router.navigateByUrl(environment.routes.authenticatedDefaultRoute);
  }

  //#endregion

}


