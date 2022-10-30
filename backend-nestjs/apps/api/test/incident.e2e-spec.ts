import request from 'supertest';
import { IncidentRoutingModule } from '../src/modules/incidents/incident.routing.module';
import { OngProxy } from '../src/modules/ong/models/ong.proxy';
import { OngRoutingModule } from '../src/modules/ong/ong.routing.module';
import { getUserToken, getUserTwoToken } from './utils/auth';
import { cleanDatabaseAndSeedUsers } from './utils/db';
import { createValidIncident, getValidCreateIncidentPayload } from './utils/incident';
import { getInstanceOfApplicationFor } from './utils/nestjs';
import { createValidOng } from './utils/ong';

describe('Incident (e2e)', () => {
  let app;
  let ong: OngProxy;
  let userToken: string;

  beforeAll(async () => {
    app = await getInstanceOfApplicationFor([OngRoutingModule, IncidentRoutingModule]);
  });

  beforeEach(async () => {
    await cleanDatabaseAndSeedUsers(app);
    userToken = await getUserToken(app);
    ong = await createValidOng(app);
  });

  describe('CREATE ONE', () => {
    it('should can create a incident', async () => {
      const createPayload = getValidCreateIncidentPayload(ong.id);

      const { body } = await request(app.getHttpServer())
        .post('/incidents')
        .auth(userToken, { type: 'bearer' })
        .send(createPayload)
        .expect(201);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('title', createPayload.title);
      expect(body).toHaveProperty('description', createPayload.description);
      expect(body).toHaveProperty('value', createPayload.value);
      expect(body).toHaveProperty('isActive', createPayload.isActive);
      expect(body).toHaveProperty('ongId', createPayload.ongId);
    });

    it('should get status 404 when send non-exist ong id', async () => {
      const createPayload = getValidCreateIncidentPayload(999);

      const { body } = await request(app.getHttpServer())
        .post('/incidents')
        .auth(userToken, { type: 'bearer' })
        .send(createPayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 404);
      expect(body).toHaveProperty('error', 'Not Found');
      expect(body).toHaveProperty('message');
    });

    it('should get status 401 when try create incident to other ong that i not owner', async () => {
      const createPayload = getValidCreateIncidentPayload(ong.id);
      const userTwoToken = await getUserTwoToken(app);

      const { body } = await request(app.getHttpServer())
        .post('/incidents')
        .auth(userTwoToken, { type: 'bearer' })
        .send(createPayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 401);
      expect(body).toHaveProperty('message');
    });

    it('should get status 401 when try create without jwt', async () => {
      const createPayload = getValidCreateIncidentPayload(ong.id);

      const { body } = await request(app.getHttpServer())
        .post('/incidents')
        .send(createPayload);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 401);
      expect(body).toHaveProperty('message');
    });
  });

  describe('GET ONE', () => {
    it('should can get one incident', async () => {
      const incident = await createValidIncident(app, userToken, ong.id);

      const { body } = await request(app.getHttpServer())
        .get(`/incidents/${ incident.id }`)
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveProperty('title', incident.title);
      expect(body).toHaveProperty('description', incident.description);
      expect(body).toHaveProperty('value', incident.value);
      expect(body).toHaveProperty('isActive', incident.isActive);
      expect(body).toHaveProperty('ongId', incident.ongId);
    });

    it('should get status 404 when send non-exist incident', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/incidents/999')
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 404);
      expect(body).toHaveProperty('message');
    });
  });

  describe('DELETE ONE', () => {
    it('should can delete one incident', async () => {
      const incident = await createValidIncident(app, userToken, ong.id);

      await request(app.getHttpServer())
        .delete(`/incidents/${ incident.id }`)
        .auth(userToken, { type: 'bearer' })
        .send()
        .expect(204);
    });

    it('should get status 404 when send non-exist ong id', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/incidents/999')
        .auth(userToken, { type: 'bearer' })
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 404);
      expect(body).toHaveProperty('message');
    });

    it('should get status 401 when try delete incident of other ong that i not owner', async () => {
      const incident = await createValidIncident(app, userToken, ong.id);
      const userTwoToken = await getUserTwoToken(app);

      const { body } = await request(app.getHttpServer())
        .delete(`/incidents/${ incident.id }`)
        .auth(userTwoToken, { type: 'bearer' })
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 401);
      expect(body).toHaveProperty('message');
    });

    it('should get status 401 when try delete without jwt', async () => {
      const incident = await createValidIncident(app, userToken, ong.id);

      const { body } = await request(app.getHttpServer())
        .delete(`/incidents/${ incident.id }`)
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveProperty('statusCode', 401);
      expect(body).toHaveProperty('message');
    });
  });

  describe('GET MANY', () => {
    it('should can get many incidents', async () => {
      const incidentOne = await createValidIncident(app, userToken, ong.id);
      const incidentTwo = await createValidIncident(app, userToken, ong.id);

      delete incidentOne.ong;
      delete incidentTwo.ong;

      const { body } = await request(app.getHttpServer())
        .get('/incidents')
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveLength(2);
      expect(body).toContainEqual(incidentOne);
      expect(body).toContainEqual(incidentTwo);
    });

    it('should can get many incidents with limit and page', async () => {
      const incidentOne = await createValidIncident(app, userToken, ong.id);
      const incidentTwo = await createValidIncident(app, userToken, ong.id);

      delete incidentOne.ong;
      delete incidentTwo.ong;

      const { body } = await request(app.getHttpServer())
        .get('/incidents?limit=1&page=2')
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveLength(1);
    });

    it('should can get many incidents filter by ong', async () => {
      const secondOng = await createValidOng(app, userToken);
      const incidentOne = await createValidIncident(app, userToken, ong.id);
      const incidentTwo = await createValidIncident(app, userToken, secondOng.id);

      delete incidentOne.ong;
      delete incidentTwo.ong;

      const { body } = await request(app.getHttpServer())
        .get(`/incidents?ongId=${ incidentOne.ongId }`)
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveLength(1);
      expect(body).toContainEqual(incidentOne);
      expect(body).not.toContainEqual(incidentTwo);
    });

    it('should can get many incidents with relations', async () => {
      const incidentOne = await createValidIncident(app, userToken, ong.id);

      delete incidentOne.ong;

      const { body } = await request(app.getHttpServer())
        .get('/incidents?relations=ong')
        .send();

      expect(body).toBeDefined();
      expect(body).toHaveLength(1);

      const { ong: incidentOng, ...incident } = body[0];

      expect(incident).toStrictEqual(incidentOne);
      expect(ong).toStrictEqual(incidentOng);
    });
  });

});
