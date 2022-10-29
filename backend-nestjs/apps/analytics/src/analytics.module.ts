import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { defaultConfig } from './infra/core/config/default.config';
import { MqttRoutingModule } from './modules/mqtt/mqtt.routing.module';
import { RouteRankMqttModule } from './modules/route-rank-mqtt/route-rank-mqtt.module';
import { RouteRankRoutingModule } from './modules/route-rank/route-rank.routing.module';
import { ServiceUsageRankMqttModule } from './modules/service-usage-rank-mqtt/service-usage-rank-mqtt.module';
import { ServiceUsageRankRoutingModule } from './modules/service-usage-rank/service-usage-rank.routing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [defaultConfig],
    }),
    MqttRoutingModule,
    ServiceUsageRankRoutingModule,
    ServiceUsageRankMqttModule,
    RouteRankRoutingModule,
    RouteRankMqttModule,
  ],
})
export class AnalyticsModule {}
