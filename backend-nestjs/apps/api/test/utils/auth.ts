//#region Imports

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

//#endregion

/**
 * Método que retorna um token JWT para a autenticação de um usuário que tem permissões de Administrador
 *
 * @param app A referência para a aplicação NestJS
 */
export async function getAdminToken(app: INestApplication): Promise<string> {
  const { body: tokenProxy } = await request(app.getHttpServer())
    .post('/auth/local')
    .send({ username: 'admin@email.com', password: '123456' })
    .expect(201);

  return tokenProxy.token.split(' ')[1];
}

/**
 * Método que retorna um token JWT para a autenticação de um usuário normal
 *
 * @param app A referência para a aplicação NestJS
 */
export async function getUserToken(app: INestApplication): Promise<string> {
  const { body: tokenProxy } = await request(app.getHttpServer())
    .post('/auth/local')
    .send({ username: 'user@email.com', password: '123456' })
    .expect(201);

  return tokenProxy.token.split(' ')[1];
}

/**
 * Método que retorna um token JWT para a autenticação de um usuário dois
 *
 * @param app A referência para a aplicação NestJS
 */
export async function getUserTwoToken(app: INestApplication): Promise<string> {
  const { body: tokenProxy } = await request(app.getHttpServer())
    .post('/auth/local')
    .send({ username: 'userTwo@email.com', password: '123456' })
    .expect(201);

  return tokenProxy.token.split(' ')[1];
}
