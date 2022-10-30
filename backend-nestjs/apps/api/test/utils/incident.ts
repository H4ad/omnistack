//#region Imports

import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateIncidentPayload } from '../../src/modules/incidents/models/create-incident.payload';
import { IncidentProxy } from '../../src/modules/incidents/models/incidents.proxy';

//#endregion

export function getValidCreateIncidentPayload(ongId: number): CreateIncidentPayload {
  return {
    title: 'Um titulo legal',
    description: 'Uma descrição legal',
    value: 10,
    isActive: true,
    ongId,
  }
}

export async function createValidIncident(app: INestApplication, userToken: string, ongId: number): Promise<IncidentProxy> {
  const createPayload = await getValidCreateIncidentPayload(ongId);

  const { body } = await request(app.getHttpServer())
    .post('/incidents')
    .auth(userToken, { type: 'bearer' })
    .send(createPayload)
    .expect(201);

  return body;
}
