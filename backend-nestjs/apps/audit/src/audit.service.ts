import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
  getHello(): string {
    return 'Hello World!';
  }
}
