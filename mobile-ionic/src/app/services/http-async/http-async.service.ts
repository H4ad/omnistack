//#region Imports

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

//#endregion

//#region Class

/**
 * A classe que representa um serviço responsável por lidar com as chamadas assincronas em um Endpoint
 */
@Injectable({
  providedIn: 'root'
})
export class HttpAsyncService {

  //#region Construtor

  /**
   * Construtor padrão
   *
   * @param http Modulo HTTP
   */
  constructor(
    public readonly http: HttpClient,
  ) {
    this.onAsyncResultError = new Subject<HttpErrorResponse>();
  }

  //#endregion

  //#region Private Properties

  /**
   * Url base para realizar as chamadas
   */
  public baseUrl;

  /**
   * O evento emitido ao ocorrer um erro com a requisição
   */
  private readonly onAsyncResultError: Subject<HttpErrorResponse>;

  /**
   * O método que realiza validações antes de executar uma requisição
   */
  private beforeValidations: () => Promise<AsyncResult<any>>;

  /**
   * O método que retorna alguns HTTP Header a serem adicionados
   */
  private loadHeaders: () => Promise<HttpHeaders | undefined>;

  //#endregion

  //#region Public Methods

  /**
   * Método que seta uma validação a ser executado antes de cada requisição
   */
  public setBeforeValidations(beforeValidation: () => Promise<AsyncResult<any>>): void {
    this.beforeValidations = beforeValidation;
  }

  /**
   * Método que seta uma validação a ser executado antes de cada requisição
   */
  public setLoadHeaders(loadHeader: () => Promise<HttpHeaders | undefined>): void {
    this.loadHeaders = loadHeader;
  }

  /**
   * Método que retorna o evento chamado ao ocorrer um erro com a chamada API
   */
  public getOnAsyncResultError(): Subject<HttpErrorResponse> {
    return this.onAsyncResultError;
  }

  /**
   * Método que define uma nova base de url para as chamadas
   *
   * @param newBaseUrl O novo url
   */
  public setBaseUrl(newBaseUrl: string): void {
    this.baseUrl = newBaseUrl;
  }

  //#endregion

  //#region Private Methods

  /**
   * Converte um resultado para AsyncResult para quando der certo
   *
   * @param result O resultado obtido
   */
  private success<T>(result: T): AsyncResult<T> {
    return {
      success: result
    } as AsyncResult<T>;
  }

  /**
   * Converte um resultado para AsyncResult para quando der certo
   *
   * @param result O resultado obtido
   */
  private successWithHeaders<T>(result: HttpResponse<T>): AsyncResultWithHeaders<T> {
    return {
      success: result.body,
      headers: result.headers,
    } as AsyncResultWithHeaders<T>;
  }

  /**
   * Encapsula o erro no AsyncResult
   *
   * @param error O erro enviado pelo servidor
   */
  private error<T>(error: HttpErrorResponse): AsyncResult<T> | AsyncResultWithHeaders<T> {
    this.onAsyncResultError.next(error);

    return {
      error,
    } as AsyncResultWithHeaders<T>;
  }

  /**
   * Método que obtém os headers
   */
  public async getHeaders(): Promise<{ headers: HttpHeaders } | undefined> {
    if (this.loadHeaders === undefined)
      return undefined;

    const result = await this.loadHeaders();

    if (result === undefined)
      return undefined;

    return { headers: result };
  }

  //#endregion

  //#region Async Restfull Methods

  /**
   * Envia uma requisição com o método GET de forma assincrona
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   */
  public async get<T>(
    url: string,
  ): Promise<AsyncResult<T>> {
    if (this.beforeValidations) {
      const validationResult = await this.beforeValidations();

      if (validationResult.error !== undefined)
        return this.error<T>(validationResult.error);
    }

    const headers = await this.getHeaders();

    return await this.http.get<T>(this.baseUrl + url, headers).toPromise()
      .then((data: T) => {
        return this.success(data);
      })
      .catch((error: HttpErrorResponse) => {
        return this.error<T>(error);
      })
      .then<AsyncResult<T>>((result: AsyncResult<T>) => {
        return result;
      });
  }

  /**
   * Envia uma requisição com o método GET de forma assincrona
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   */
  public async getWithHeaders<T>(
    url: string,
  ): Promise<AsyncResultWithHeaders<T>> {
    if (this.beforeValidations) {
      const validationResult = await this.beforeValidations();

      if (validationResult.error !== undefined)
        return this.error<T>(validationResult.error);
    }

    return await this.http.get<T>(this.baseUrl + url, { observe: 'response', headers: new HttpHeaders({'Content-Type': 'application/json'}), responseType: 'json' }).toPromise()
      .then((data: HttpResponse<T>) => {
        return this.successWithHeaders(data);
      })
      .catch((error: HttpErrorResponse) => {
        return this.error<T>(error);
      })
      .then<AsyncResultWithHeaders<T>>((result: AsyncResultWithHeaders<T>) => {
        return result;
      });
  }

  /**
   * Envia uma requisição com o método POST
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   * @param payload Informações a serem enviadas para o servidor
   */
  public async post<T>(
    url: string,
    payload: object,
  ): Promise<AsyncResult<T>> {
    if (this.beforeValidations) {
      const validationResult = await this.beforeValidations();

      if (validationResult.error !== undefined)
        return this.error<T>(validationResult.error);
    }

    const headers = await this.getHeaders();

    return await this.http.post<T>(this.baseUrl + url, payload, headers).toPromise()
      .then((data: T) => {
        return this.success(data);
      })
      .catch((error: HttpErrorResponse) => {
        return this.error<T>(error);
      })
      .then<AsyncResult<T>>((result: AsyncResult<T>) => {
        return result;
      });
  }

  /**
   * Envia uma requisição com o método PUT
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   * @param payload Informações a serem enviadas para o servidor
   */
  public async put<T>(
    url: string,
    payload: object,
  ): Promise<AsyncResult<T>> {
    if (this.beforeValidations) {
      const validationResult = await this.beforeValidations();

      if (validationResult.error !== undefined)
        return this.error<T>(validationResult.error);
    }

    const headers = await this.getHeaders();

    return await this.http.put<T>(this.baseUrl + url, payload, headers).toPromise()
      .then((data: T) => {
        return this.success(data);
      })
      .catch((error: HttpErrorResponse) => {
        return this.error<T>(error);
      })
      .then<AsyncResult<T>>((result: AsyncResult<T>) => {
        return result;
      });
  }

  /**
   * Envia uma requisição com o método DELETE
   *
   * @param url Url para a requisição. Obs: Ele já é automaticamente combinado com a url base
   */
  public async delete<T>(
    url: string,
  ): Promise<AsyncResult<T>> {
    if (this.beforeValidations) {
      const validationResult = await this.beforeValidations();

      if (validationResult.error !== undefined)
        return this.error<T>(validationResult.error);
    }

    const headers = await this.getHeaders();

    return await this.http.delete<T>(this.baseUrl + url, headers).toPromise()
      .then((data: T) => {
        return this.success(data);
      })
      .catch((error: HttpErrorResponse) => {
        return this.error<T>(error);
      })
      .then<AsyncResult<T>>((result: AsyncResult<T>) => {
        return result;
      });
  }

  /**
   * Método que busca pelo método GET algum objeto BLOB
   *
   * @param url O url a ser buscado
   */
  public async getBlob(url: string): Promise<AsyncResult<ArrayBuffer>> {
    if (this.beforeValidations) {
      const validationResult = await this.beforeValidations();

      if (validationResult.error !== undefined)
        return this.error<ArrayBuffer>(validationResult.error);
    }

    const headers = await this.getHeaders();

    // @ts-ignore
    return await this.http.get<ArrayBuffer>(this.baseUrl + url, { responseType: 'blob', ...headers }).toPromise()
      .then((data: ArrayBuffer) => {
        return this.success(data);
      })
      .catch((error: HttpErrorResponse) => {
        return this.error<ArrayBuffer>(error);
      })
      .then<AsyncResult<ArrayBuffer>>((result: AsyncResult<ArrayBuffer>) => {
        return result;
      });
  }

  //#endregion

}

//#endregion


//#region Interfaces

/**
 * A interface que representa um resultado obtido de forma assincrona
 */
export interface AsyncResult<T> {

  /**
   * O resultado quando ocorre tudo certo
   */
  success?: T;

  /**
   * O resultado quando dá algum problema
   */
  error?: HttpErrorResponse;

}

/**
 * A interface que representa um resultado obtido de forma assincrona incluindo os headers da requisição
 */
export interface AsyncResultWithHeaders<T> {

  /**
   * O resultado quando ocorre tudo certo
   */
  success?: T;

  /**
   * O resultado quando dá algum problema
   */
  error?: HttpErrorResponse;

  /**
   * Os headers da requisição
   */
  headers?: HttpHeaders;

}

//#endregion
