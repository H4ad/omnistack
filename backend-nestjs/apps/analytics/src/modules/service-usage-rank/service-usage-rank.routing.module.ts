import { Module } from '@nestjs/common';
import { ServiceUsageRankController } from './controllers/service-usage-rank.controller';
import { ServiceUsageRankModule } from './service-usage-rank.module';

@Module({
  imports: [
    ServiceUsageRankModule,
  ],
  controllers: [
    ServiceUsageRankController,
  ],
})
export class ServiceUsageRankRoutingModule {}
