import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import { defaultConfig } from '../src/infra/core/config/default.config';
import { ServiceUsageRankController } from '../src/modules/service-usage-rank/controllers/service-usage-rank.controller';
import { ServiceUsageRankProxy } from '../src/modules/service-usage-rank/models/service-usage-rank.proxy';
import { ServiceUsageRankRepository } from '../src/modules/service-usage-rank/repositories/service-usage-rank.repository';
import { ServiceUsageRankService } from '../src/modules/service-usage-rank/services/service-usage-rank.service';
import { setup } from '../src/setup';
import Mock = jest.Mock;

describe(ServiceUsageRankController.name, () => {
  const mockedData = [
    new ServiceUsageRankProxy(1, 'api', 5),
    new ServiceUsageRankProxy(2, 'analytics', 2),
    new ServiceUsageRankProxy(3, 'test', 1),
  ];

  const repository = {
    incrementByService: jest.fn(),
    getCount: jest.fn(() => mockedData.length),
    list: jest.fn((from, to) => mockedData.slice(from, to)),
  } as Partial<Record<keyof ServiceUsageRankRepository, Mock<any, any>>>;

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(defaultConfig),
      ],
      controllers: [ServiceUsageRankController],
      providers: [ServiceUsageRankService],
    }).useMocker(token => {
      if (token === ServiceUsageRankRepository)
        return repository;

    }).compile();

    app = moduleFixture.createNestApplication();

    setup(app);

    await app.init();
  });

  describe('list', () => {
    it('should list all data', async () => {
      await supertest(app.getHttpServer())
        .get('/services')
        .expect(JSON.parse(JSON.stringify(mockedData)))
        .expect(res => {
          expect(res.header).toHaveProperty('x-total-count', '3');
        });
    });

    it('should list data by page and limt', async () => {
      await supertest(app.getHttpServer())
        .get('/services?page=2&limit=1')
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
