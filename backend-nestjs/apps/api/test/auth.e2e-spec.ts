import * as request from 'supertest';

import { cleanDatabaseAndSeedUsers } from './utils/db';
import { getInstanceOfApplication } from './utils/nestjs';

describe('Auth (e2e)', () => {
  let app;

  beforeAll(async () => {
    app = await getInstanceOfApplication();
  });

  beforeEach(async () => {
    await cleanDatabaseAndSeedUsers(app);
  });

  describe('Local Strategy', () => {
    it('should get jwt token login with user@email.com', async () => {
      const { body: tokenProxy } = await request(app.getHttpServer())
        .post('/auth/local')
        .send({ username: 'user@email.com', password: '123456' })
        .expect(201);

      expect(tokenProxy).toBeDefined();
      expect(tokenProxy).toHaveProperty('token');
      expect(tokenProxy).toHaveProperty('expiresAt');
      expect(tokenProxy.token).toContain('Bearer');
    });

    it('should get jwt token login with userTwo@email.com', async () => {
      const { body: tokenProxy } = await request(app.getHttpServer())
        .post('/auth/local')
        .send({ username: 'userTwo@email.com', password: '123456' })
        .expect(201);

      expect(tokenProxy).toBeDefined();
      expect(tokenProxy).toHaveProperty('token');
      expect(tokenProxy).toHaveProperty('expiresAt');
      expect(tokenProxy.token).toContain('Bearer');
    });

    it('should get jwt token login with admin@email.com', async () => {
      const { body: tokenProxy } = await request(app.getHttpServer())
        .post('/auth/local')
        .send({ username: 'admin@email.com', password: '123456' })
        .expect(201);

      expect(tokenProxy).toBeDefined();
      expect(tokenProxy).toHaveProperty('token');
      expect(tokenProxy).toHaveProperty('expiresAt');
      expect(tokenProxy.token).toContain('Bearer');
    });

    it('should get 401 status when try login with incorrect password', async () => {
      const { body: errorMessage } = await request(app.getHttpServer())
        .post('/auth/local')
        .send({ username: 'admin@email.com', password: 'WRONG_PASSWORD' })
        .expect(401);

      expect(errorMessage).toBeDefined();
      expect(errorMessage).toHaveProperty('message');
      expect(errorMessage).toHaveProperty('statusCode');
      expect(errorMessage).toHaveProperty('error');
    });

    it('should get 401 status when not send valid payload', async () => {
      const { body: errorMessage } = await request(app.getHttpServer())
        .post('/auth/local')
        .send({})
        .expect(401);

      expect(errorMessage).toBeDefined();
      expect(errorMessage).toHaveProperty('message');
      expect(errorMessage).toHaveProperty('statusCode');
    });

    it('should get 401 status when not send password', async () => {
      const { body: errorMessage } = await request(app.getHttpServer())
        .post('/auth/local')
        .send({ username: 'admin@email.com' })
        .expect(401);

      expect(errorMessage).toBeDefined();
      expect(errorMessage).toHaveProperty('message');
      expect(errorMessage).toHaveProperty('statusCode');
    });
  });
});
