//#region Imports

import axios, { AxiosError, AxiosResponse } from 'axios';

import { IncidentProxy } from '../models/proxies/incident.proxy';

//#endregion

const api = axios.create({
  baseURL: 'http://192.168.2.120:3010',
});

export default api;

/**
 * Método que retorna os incidentes de uma ong
 *
 * @param limit A quantidade máxima de itens
 * @param page A página que eu quero usar
 */
export async function getIncidents(limit: number = 15, page: number = 1): Promise<[number, IncidentProxy[]] | string> {
  const { success, error } = await api.get<IncidentProxy[]>(`/incidents?limit=${ limit }&page=${ page }&relations=ong,user`)
    .then((success: AxiosResponse<IncidentProxy[]>) => ({ success: [Number(success.headers['x-total-count']), success.data], error: void 0 }))
    .catch((error: AxiosError<{ message: string[] | string }>) => ({ error: error.response?.data, success: void 0  }));

  if (error)
    return Array.isArray(error.message) ? error.message[0] : error.message;

  return success as [number, IncidentProxy[]];
}
