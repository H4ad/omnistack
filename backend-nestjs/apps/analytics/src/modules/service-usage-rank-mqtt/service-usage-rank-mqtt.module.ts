import { Module } from '@nestjs/common';
import { MqttModule } from '../mqtt/mqtt.module';
import { ServiceUsageRankModule } from '../service-usage-rank/service-usage-rank.module';
import { ServiceUsageRankMqttService } from './services/service-usage-rank-mqtt.service';

@Module({
  imports: [
    MqttModule,
    ServiceUsageRankModule,
  ],
  providers: [
    ServiceUsageRankMqttService,
  ],
})
export class ServiceUsageRankMqttModule {}
