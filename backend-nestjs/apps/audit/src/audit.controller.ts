import { Controller, Get } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  getHello(): string {
    return this.auditService.getHello();
  }
}
