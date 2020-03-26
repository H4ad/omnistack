//#region Imports

import axios, { AxiosError, AxiosResponse } from 'axios';

import { KeysEnum } from '../models/enums/keys.enum';
import { CreateOngPayload } from '../models/payloads/create-ong.payload';
import { CreateUserPayload } from '../models/payloads/create-user.payload';
import { LoginPayload } from '../models/payloads/login.payload';
import { IncidentProxy } from '../models/proxies/incident.proxy';
import { OngProxy } from '../models/proxies/ong.proxy';
import { TokenProxy } from '../models/proxies/token.proxy';
import { UserProxy } from '../models/proxies/user.proxy';

//#endregion

const api = axios.create({
  baseURL: 'http://127.0.0.1:3010',
});

export default api;


/**
 * Método que realiza a autenticação de um usuário
 *
 * @param loginPayload As informações de autenticação
 */
export async function auth(loginPayload: LoginPayload): Promise<TokenProxy | string> {
  const { success, error } = await api.post<TokenProxy>('/auth/local', loginPayload)
    .then((success: AxiosResponse<TokenProxy>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data, success: void 0  }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  const result = success as TokenProxy;

  localStorage.setItem(KeysEnum.TOKEN_PROXY, result.token);

  return result;
}

/**
 * Método que cria um usuário
 *
 * @param userPayload As informações para a criação do usuário
 */
export async function createUser(userPayload: CreateUserPayload): Promise<UserProxy | string> {
  const { success, error } = await api.post<UserProxy>('/users', userPayload)
    .then((success: AxiosResponse<UserProxy>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data, success: void 0  }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  const result = success as UserProxy;

  localStorage.setItem(KeysEnum.USER_PROXY, JSON.stringify(result));

  return result;
}

/**
 * Método que busca as minhas informações
 */
export async function getMe(): Promise<UserProxy | string> {
  const token = localStorage.getItem(KeysEnum.TOKEN_PROXY);
  const headers = { Authorization: token };

  const { success, error } = await api.get<UserProxy>('/users/me', { headers })
    .then((success: AxiosResponse<UserProxy>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data, success: void 0  }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  const result = success as UserProxy;

  localStorage.setItem(KeysEnum.USER_PROXY, JSON.stringify(result));

  return result;
}

/**
 * Método que cria uma ong para o usuário
 *
 * @param ongPayload As informações para a criação da ong
 */
export async function createOng(ongPayload: CreateOngPayload): Promise<OngProxy | string> {
  const token = localStorage.getItem(KeysEnum.TOKEN_PROXY);
  const headers = { Authorization: token };

  const { success, error } = await api.post<OngProxy>('/ongs', ongPayload, { headers })
    .then((success: AxiosResponse<OngProxy>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data, success: void 0  }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  return success as OngProxy;
}

/**
 * Método que retorna os incidentes de uma ong
 *
 * @param ongId A identificação da ong
 */
export async function getIncidents(ongId: number): Promise<IncidentProxy[] | string> {
  const { success, error } = await api.get<IncidentProxy[]>(`/incidents?ongId=${ ongId }`)
    .then((success: AxiosResponse<IncidentProxy[]>) => ({ success: success.data, error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data, success: void 0  }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  return success as IncidentProxy[];
}
