import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsModule } from './../src/analytics.module';

describe('AnalyticsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AnalyticsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
});
