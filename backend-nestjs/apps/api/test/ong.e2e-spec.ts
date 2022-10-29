import request from 'supertest';
import { IncidentRoutingModule } from '../src/modules/incidents/incident.routing.module';
import { CreateIncidentPayload } from '../src/modules/incidents/models/create-incident.payload';
import { CreateOngPayload } from '../src/modules/ong/models/create-ong.payload';
import { OngRoutingModule } from '../src/modules/ong/ong.routing.module';
import { getUserToken, getUserTwoToken } from './utils/auth';
import { cleanDatabaseAndSeedUsers } from './utils/db';
import { getInstanceOfApplicationFor } from './utils/nestjs';
import { createValidOng, getValidCreateOngPayload, getValidUpdateOngPayload } from './utils/ong';

describe('Ong (e2e)', () => {
  let app;

  beforeAll(async () => {
    app = await getInstanceOfApplicationFor([OngRoutingModule, IncidentRoutingModule]);
  });

  beforeEach(async () => {
    await cleanDatabaseAndSeedUsers(app);
  });

  describe('CREATE ONG', () => {
    it('should can create a new ong', async () => {
      const createPayload: CreateOngPayload = getValidCreateOngPayload();
      const userToken = await getUserToken(app);

      const { body } = await request(app.getHttpServer())
        .post('/ongs')
        .auth(userToken, { type: 'bearer' })
        .send(createPayload)
        .expect(201);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('name', createPayload.name);
      expect(body).toHaveProperty('email', createPayload.email);
      expect(body).toHaveProperty('city', createPayload.city);
      expect(body).toHaveProperty('uf', createPayload.uf);
      expect(body).toHaveProperty('whatsapp', createPayload.whatsapp);
      expect(body).toHaveProperty('isActive', createPayload.isActive);
    });

    it('should get status 400 when send invalid payload', async () => {
      const createPayload: Record<keyof CreateOngPayload, any> = {
        name: 0,
        email: 0,
        city: 0,
        uf: 0,
        whatsapp: 0,
        isActive: 1,
      };
      const userToken = await getUserToken(app);

      const { body } = await request(app.getHttpServer())
        .post('/ongs')
        .auth(userToken, { type: 'bearer' })
        .send(createPayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 400);
      expect(body).toHaveProperty('error', 'Bad Request');
      expect(body).toHaveProperty('message');
    });

    it('should get status 401 when try create a ong without authenticate with jwt', async () => {
      const createPayload: CreateOngPayload = getValidCreateOngPayload();
      const { body } = await request(app.getHttpServer())
        .post('/ongs')
        .send(createPayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 401);
      expect(body).toHaveProperty('message');
    });
  });

  describe('GET MANY', () => {
    it('should can get many ongs', async () => {
      const ongByUser = await createValidOng(app, await getUserToken(app));
      const ongByUserTwo = await createValidOng(app, await getUserTwoToken(app));

      const { body } = await request(app.getHttpServer())
        .get('/ongs')
        .send()
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toHaveLength(2);
      expect(body).toContainEqual(ongByUser);
      expect(body).toContainEqual(ongByUserTwo);
    });

    it('should can get many ongs of only one user', async () => {
      const ongByUser = await createValidOng(app, await getUserToken(app));
      const ongByUserTwo = await createValidOng(app, await getUserTwoToken(app));

      const { body } = await request(app.getHttpServer())
        .get(`/ongs?userId=${ ongByUser.userId }`)
        .send()
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toHaveLength(1);
      expect(body).toContainEqual(ongByUser);
      expect(body).not.toContainEqual(ongByUserTwo);
    });

    it('should can get many and include relations', async () => {
      const userToken = await getUserToken(app);
      const { cases: oldCases, ...ongByUser } = await createValidOng(app, userToken);
      const { body: oldIncident } = await request(app.getHttpServer())
        .post('/incidents')
        .auth(userToken, { type: 'bearer' })
        .send({ title: 'Teste', description: 'a', value: 10, ongId: ongByUser.id } as CreateIncidentPayload)
        .expect(201);
      const { ong: oldIncidentOng, ...incident } = oldIncident;

      const { body } = await request(app.getHttpServer())
        .get('/ongs?relations=user,cases')
        .send()
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toHaveLength(1);

      const { user, cases, ...ong } = body[0];

      expect(ong).toStrictEqual(ongByUser);
      expect(user).toBeDefined();
      expect(cases).toBeDefined();
      expect(cases).toHaveLength(1);
      expect(cases).toContainEqual(incident);
      expect(user).toHaveProperty('id', ong.userId);
    });
  });

  describe('GET ONE', () => {
    it('should can get ong by id', async () => {
      const ong = await createValidOng(app);

      const { body } = await request(app.getHttpServer())
        .get(`/ongs/${ ong.id }`)
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveProperty('name', ong.name);
      expect(body).toHaveProperty('email', ong.email);
      expect(body).toHaveProperty('city', ong.city);
      expect(body).toHaveProperty('uf', ong.uf);
      expect(body).toHaveProperty('whatsapp', ong.whatsapp);
      expect(body).toHaveProperty('isActive', ong.isActive);
    });

    it('should can get status 404 when send non-exists ong id', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/ongs/999')
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 404);
      expect(body).toHaveProperty('message');
    });
  });

  describe('UPDATE ONE', () => {
    it('should can update a ong', async () => {
      const userToken = await getUserToken(app);
      const ongByUser = await createValidOng(app, userToken);
      const updatePayload = getValidUpdateOngPayload();
      const { body } = await request(app.getHttpServer())
        .put(`/ongs/${ ongByUser.id }`)
        .auth(userToken, { type: 'bearer' })
        .send(updatePayload)
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('name', updatePayload.name);
      expect(body).toHaveProperty('email', updatePayload.email);
      expect(body).toHaveProperty('city', updatePayload.city);
      expect(body).toHaveProperty('uf', updatePayload.uf);
      expect(body).toHaveProperty('whatsapp', updatePayload.whatsapp);
      expect(body).toHaveProperty('isActive', updatePayload.isActive);
    });

    it('should get error 401 when try update without authentication with jwt', async () => {
      const userToken = await getUserToken(app);
      const ongByUser = await createValidOng(app, userToken);
      const updatePayload = getValidUpdateOngPayload();
      const { body } = await request(app.getHttpServer())
        .put(`/ongs/${ ongByUser.id }`)
        .send(updatePayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 401);
      expect(body).toHaveProperty('message');
    });

    it('should get status 401 when try update ong of another user', async () => {
      const userToken = await getUserToken(app);
      const ongByUser = await createValidOng(app, userToken);

      const updatePayload = getValidUpdateOngPayload();

      const userTwoToken = await getUserTwoToken(app);
      const { body } = await request(app.getHttpServer())
        .put(`/ongs/${ ongByUser.id }`)
        .auth(userTwoToken, { type: 'bearer' })
        .send(updatePayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 401);
      expect(body).toHaveProperty('message');
    });
  });
});
