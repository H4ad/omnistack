import { Module } from '@nestjs/common';
import { IoredisModule } from '../../infra/core/ioredis/ioredis.module';
import { ServiceUsageRankService } from './services/service-usage-rank.service';

@Module({
  imports: [
    IoredisModule,
  ],
  exports: [
    ServiceUsageRankService,
  ],
  providers: [
    ServiceUsageRankService,
  ],
})
export class ServiceUsageRankModule {}
