//#region Imports

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

//#endregion

/**
 * Método que realiza uma limpeza completa no banco de dados e realiza o seed dos usuários padrões
 *
 * @param app A referência para a aplicação NestJS
 */
export async function cleanDatabaseAndSeedUsers(app: INestApplication) {
  await request(app.getHttpServer())
    .post('/tests/clear')
    .expect(204);

  await request(app.getHttpServer())
    .post('/tests/seed/users')
    .expect(204);
}
