import { Module } from '@nestjs/common';
import { IoredisModule } from '../../infra/core/ioredis/ioredis.module';
import { ServiceUsageRankRepository } from './repositories/service-usage-rank.repository';
import { ServiceUsageRankService } from './services/service-usage-rank.service';

@Module({
  imports: [
    IoredisModule,
  ],
  providers: [
    ServiceUsageRankRepository,
    ServiceUsageRankService,
  ],
  exports: [
    ServiceUsageRankService,
  ],
})
export class ServiceUsageRankModule {}
