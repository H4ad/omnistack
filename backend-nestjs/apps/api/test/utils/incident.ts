//#region Imports

import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateIncidentPayload } from '../../src/modules/incidents/models/create-incident.payload';
import { IncidentProxy } from '../../src/modules/incidents/models/incidents.proxy';

//#endregion

/**
 * Método que retorna um payload válido para a criação de um caso
 *
 * @param ongId A identificação da ong para qual será criada esse caso
 */
export function getValidCreateIncidentPayload(ongId: number): CreateIncidentPayload {
  return {
    title: 'Um titulo legal',
    description: 'Uma descrição legal',
    value: 10,
    isActive: true,
    ongId,
  }
}

/**
 * Método que retorna um incidente válido
 *
 * @param app A referência para a aplicação NestJS
 * @param userToken O token de autenticação do usuário
 * @param ongId A identificação da ong para qual será criada esse caso
 */
export async function createValidIncident(app: INestApplication, userToken: string, ongId: number): Promise<IncidentProxy> {
  const createPayload = await getValidCreateIncidentPayload(ongId);

  const { body } = await request(app.getHttpServer())
    .post('/incidents')
    .auth(userToken, { type: 'bearer' })
    .send(createPayload)
    .expect(201);

  return body;
}
