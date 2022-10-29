import { Test, TestingModule } from '@nestjs/testing';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';

describe('AuditController', () => {
  let auditController: AuditController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuditController],
      providers: [AuditService],
    }).compile();

    auditController = app.get<AuditController>(AuditController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(auditController.getHello()).toBe('Hello World!');
    });
  });
});
