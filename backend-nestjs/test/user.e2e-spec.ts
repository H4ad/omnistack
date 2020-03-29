import * as request from 'supertest';

import { LoginPayload } from '../src/modules/auth/models/login.payload';
import { CreateUserPayload } from '../src/modules/user/models/create-user.payload';
import { UpdateUserPayload } from '../src/modules/user/models/update-user.payload';
import { TestUsersId } from './models/test-users-id.enum';
import { getAdminToken, getUserToken, getUserTwoToken } from './utils/auth';
import { cleanDatabaseAndSeedUsers } from './utils/db';
import { getInstanceOfApplication } from './utils/nestjs';

describe('User (e2e)', () => {
  let app;

  beforeAll(async () => {
    app = await getInstanceOfApplication();
  });

  beforeEach(async () => {
    await cleanDatabaseAndSeedUsers(app);
  });

  describe('GET ME', () => {
    it('should get me', async () => {
      const userToken = await getUserToken(app);

      const { body } = await request(app.getHttpServer())
        .get('/users/me')
        .auth(userToken, { type: 'bearer' })
        .send()
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('email', 'user@email.com');
      expect(body).toHaveProperty('roles');
      expect(body).not.toHaveProperty('password');
    });

    it('should get status 401 when try get me when it is not authenticated', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users/me')
        .send()
        .expect(401);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('message', 'Unauthorized');
      expect(body).toHaveProperty('statusCode');
    });
  });

  describe('GET MANY', () => {
    it('should get status 401 when get users without send token', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users')
        .send()
        .expect(401);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('message', 'Unauthorized');
      expect(body).toHaveProperty('statusCode');
    });

    it('should get status 401 when get users with user that it is not admin', async () => {
      const userToken = await getUserToken(app);
      const { body } = await request(app.getHttpServer())
        .get('/users')
        .auth(userToken, { type: 'bearer' })
        .send()
        .expect(401);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('error', 'Unauthorized');
      expect(body).toHaveProperty('statusCode');
    });

    it('should get users when logged with admin', async () => {
      const adminToken = await getAdminToken(app);
      const { body } = await request(app.getHttpServer())
        .get('/users')
        .auth(adminToken, { type: 'bearer' })
        .send()
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toHaveLength(3);
    });
  });

  describe('GET ONE', () => {
    it('should get user by id when it is logged with the same user', async () => {
      const userToken = await getUserToken(app);
      const { body } = await request(app.getHttpServer())
        .get(`/users/${ TestUsersId.USER }`)
        .auth(userToken, { type: 'bearer' })
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveProperty('email', 'user@email.com');
      expect(body).not.toHaveProperty('password');
    });

    it('should get status 401 when try get user info of other user', async () => {
      const userToken = await getUserToken(app);
      const { body } = await request(app.getHttpServer())
        .get(`/users/${ TestUsersId.USER_TWO }`)
        .auth(userToken, { type: 'bearer' })
        .send()
        .expect(401);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('error', 'Unauthorized');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('statusCode');
    });

    it('should get status 404 when try get user by id that not exists as admin', async () => {
      const adminToken = await getAdminToken(app);
      const { body } = await request(app.getHttpServer())
        .get(`/users/999`)
        .auth(adminToken, { type: 'bearer' })
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveProperty('error', 'Not Found');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('statusCode', 404);
    });
  });

  describe('CREATE', () => {
    it('should can create a new user', async () => {
      const createPayload: CreateUserPayload = {
        email: 'new@email.com',
        password: '123456',
        isActive: true,
      };

      const { body } = await request(app.getHttpServer())
        .post(`/users`)
        .send(createPayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('email', createPayload.email);
      expect(body).toHaveProperty('roles', 'user');
      expect(body).not.toHaveProperty('password');
    });

    it('should get status 400 when try create a user with already exist email', async () => {
      const createPayload: CreateUserPayload = {
        email: 'new@email.com',
        password: '123456',
      };

      await request(app.getHttpServer())
        .post(`/users`)
        .send(createPayload);
      const { body } = await request(app.getHttpServer())
        .post(`/users`)
        .send(createPayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('error');
      expect(body).toHaveProperty('statusCode', 400);
      expect(body).toHaveProperty('message');
    });

    it('should get status 400 when send invalid payload', async () => {
      const createPayload: Record<keyof CreateUserPayload, any> = {
        email: 0,
        password: 0,
        isActive: 'false',
      };

      const { body } = await request(app.getHttpServer())
        .post(`/users`)
        .send(createPayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('error');
      expect(body).toHaveProperty('statusCode', 400);
      expect(body).toHaveProperty('message');
    });
  });

  describe('UPDATE', () => {
    it('should can update my email', async () => {
      const userToken = await getUserToken(app);
      const updatePayload: UpdateUserPayload = {
        email: 'joga10@email.com',
      };
      const { body } = await request(app.getHttpServer())
        .put(`/users/${ TestUsersId.USER }`)
        .auth(userToken, { type: 'bearer' })
        .send(updatePayload)
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('email', updatePayload.email);
      expect(body).not.toHaveProperty('password');
    });

    it('should can update my password', async () => {
      const userToken = await getUserToken(app);
      const updatePayload: UpdateUserPayload = {
        email: 'newEmail@email.com',
        password: 'newPassword',
      };
      const { body } = await request(app.getHttpServer())
        .put(`/users/${ TestUsersId.USER }`)
        .auth(userToken, { type: 'bearer' })
        .send(updatePayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('email', updatePayload.email);
      expect(body).not.toHaveProperty('password');

      const authPayload: LoginPayload = {
        username: updatePayload.email,
        password: updatePayload.password,
      };
      const { body: authResponse } = await request(app.getHttpServer())
        .post(`/auth/local`)
        .send(authPayload);

      expect(authResponse).toBeDefined();
      expect(authResponse).toHaveProperty('token');
    });

    it('should get status 401 when try update user by id when logged with other user', async () => {
      const userToken = await getUserToken(app);
      const updatePayload: UpdateUserPayload = {
        email: 'joga10@email.com',
      };
      const { body } = await request(app.getHttpServer())
        .put(`/users/${ TestUsersId.USER_TWO }`)
        .auth(userToken, { type: 'bearer' })
        .send(updatePayload)
        .expect(401);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('error', 'Unauthorized');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('statusCode');
    });

    it('should get status 404 when try update user by id that not exists', async () => {
      const adminToken = await getAdminToken(app);
      const updatePayload: UpdateUserPayload = {
        email: 'joga10@email.com',
      };
      const { body } = await request(app.getHttpServer())
        .put(`/users/999`)
        .auth(adminToken, { type: 'bearer' })
        .send(updatePayload)
        .expect(404);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('error', 'Not Found');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('statusCode');
    });

    it('should get status 400 when try update for one that already used for other user', async () => {
      const userToken = await getUserToken(app);
      const updatePayload: UpdateUserPayload = {
        email: 'newEmail@email.com',
        password: 'newPassword',
      };

      await request(app.getHttpServer())
        .put(`/users/${ TestUsersId.USER }`)
        .auth(userToken, { type: 'bearer' })
        .send(updatePayload)
        .expect(200);

      const userTwo = await getUserTwoToken(app);
      const { body } = await request(app.getHttpServer())
        .put(`/users/${ TestUsersId.USER_TWO }`)
        .auth(userTwo, { type: 'bearer' })
        .send(updatePayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('error', 'Bad Request');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('statusCode', 400);
    });
  });
});
