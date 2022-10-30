import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import { defaultConfig } from '../src/infra/core/config/default.config';
import { RouteRankController } from '../src/modules/route-rank/controllers/route-rank.controller';
import { RouteRankProxy } from '../src/modules/route-rank/models/route-rank.proxy';
import { RouteRankRepository } from '../src/modules/route-rank/repositories/route-rank.repository';
import { RouteRankService } from '../src/modules/route-rank/services/route-rank.service';
import { setup } from '../src/setup';
import Mock = jest.Mock;

describe(RouteRankController.name, () => {
  const mockedData = [
    new RouteRankProxy(1, 'GET:/test', 5),
    new RouteRankProxy(2, 'GET:/test2', 2),
    new RouteRankProxy(3, 'GET:/test3', 1),
  ];

  const repository = {
    incrementByService: jest.fn(),
    getCountByService: jest.fn(() => mockedData.length),
    listByService: jest.fn((_, from, to) => mockedData.slice(from, to)),
  } as Partial<Record<keyof RouteRankRepository, Mock<any, any>>>;

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(defaultConfig),
      ],
      controllers: [RouteRankController],
      providers: [RouteRankService],
    }).useMocker(token => {
      if (token === RouteRankRepository)
        return repository;

    }).compile();

    app = moduleFixture.createNestApplication();

    setup(app);

    await app.init();
  });

  describe('list', () => {
    it('should list all data', async () => {
      await supertest(app.getHttpServer())
        .get('/routes/app')
        .expect(JSON.parse(JSON.stringify(mockedData)))
        .expect(res => {
          expect(res.header).toHaveProperty('x-total-count', '3');
        });
    });

    it('should list data by page and limt', async () => {
      await supertest(app.getHttpServer())
        .get('/routes/app?page=2&limit=1')
        .expect(JSON.parse(JSON.stringify([mockedData[1]])))
        .expect(res => {
          expect(res.header).toHaveProperty('x-total-count', '3');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
