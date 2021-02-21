//#region Imports

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { KeysEnum } from '../../models/enums/keys.enum';
import { AsyncResult, HttpAsyncService } from '../../services/http-async/http-async.service';

//#endregion

/**
 * A factory usada para criar o serviço de HttpAsync
 *
 * @param http O serviço nativo do angular para HTTP
 * @param storage O serviço usado para armazenar itens no cache
 */
export function httpAsyncFactory(
  http: HttpClient,
) {
  const httpAsync: HttpAsyncService = new HttpAsyncService(http);

  httpAsync.setBaseUrl(environment.api.baseUrl);
  httpAsync.setBeforeValidations(async () => {
    return { error: undefined } as AsyncResult<any>;
  });

  httpAsync.setLoadHeaders(async () => {
    const token = localStorage.getItem(KeysEnum.TOKEN_PROXY);

    if (!token)
      return new HttpHeaders();

    return new HttpHeaders({ Authorization: token });
  });

  httpAsync.getOnAsyncResultError().subscribe((error: HttpErrorResponse) => {
    console.error(error);
  });

  return httpAsync;
}
