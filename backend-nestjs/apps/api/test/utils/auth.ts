//#region Imports

import { INestApplication } from '@nestjs/common';
import request from 'supertest';

//#endregion

export async function getAdminToken(app: INestApplication): Promise<string> {
  const { body: tokenProxy } = await request(app.getHttpServer())
    .post('/auth/local')
    .send({ username: 'admin@email.com', password: '123456' })
    .expect(201);

  return tokenProxy.token.split(' ')[1];
}

export async function getUserToken(app: INestApplication): Promise<string> {
  const { body: tokenProxy } = await request(app.getHttpServer())
    .post('/auth/local')
    .send({ username: 'user@email.com', password: '123456' })
    .expect(201);

  return tokenProxy.token.split(' ')[1];
}

export async function getUserTwoToken(app: INestApplication): Promise<string> {
  const { body: tokenProxy } = await request(app.getHttpServer())
    .post('/auth/local')
    .send({ username: 'userTwo@email.com', password: '123456' })
    .expect(201);

  return tokenProxy.token.split(' ')[1];
}
