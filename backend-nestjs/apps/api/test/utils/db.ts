//#region Imports

import { INestApplication } from '@nestjs/common';
import request from 'supertest';

//#endregion

export async function cleanDatabaseAndSeedUsers(app: INestApplication) {
  await request(app.getHttpServer())
    .post('/tests/clear')
    .expect(204);

  await request(app.getHttpServer())
    .post('/tests/seed/users')
    .expect(204);
}
