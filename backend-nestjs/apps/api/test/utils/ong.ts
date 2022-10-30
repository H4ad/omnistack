//#region Imports

import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateOngPayload } from '../../src/modules/ong/models/create-ong.payload';
import { OngProxy } from '../../src/modules/ong/models/ong.proxy';
import { UpdateOngPayload } from '../../src/modules/ong/models/update-ong.payload';
import { getUserToken } from './auth';

//#endregion

export function getValidCreateOngPayload(): CreateOngPayload {
  return {
    name: 'APAD',
    email: 'contato@apad.com',
    city: 'Sorocaba',
    uf: 'SP',
    whatsapp: '15988116111',
    isActive: true,
  };
}

export function getValidUpdateOngPayload(): UpdateOngPayload {
  return {
    name: 'PAPAD',
    email: 'newContato@apad.com',
    city: 'São Paulo',
    uf: 'RJ',
    whatsapp: '15988116112',
    isActive: true,
  };
}

export async function createValidOng(app: INestApplication, token?: string): Promise<OngProxy> {
  const createPayload: CreateOngPayload = getValidCreateOngPayload();
  const userToken = token || await getUserToken(app);

  const { body } = await request(app.getHttpServer())
    .post('/ongs')
    .auth(userToken, { type: 'bearer' })
    .send(createPayload)
    .expect(201);

  return body;
}
