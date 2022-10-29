import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsController', () => {
  let analyticsController: AnalyticsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [AnalyticsService],
    }).compile();

    analyticsController = app.get<AnalyticsController>(AnalyticsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(analyticsController.getHello()).toBe('Hello World!');
    });
  });
});
