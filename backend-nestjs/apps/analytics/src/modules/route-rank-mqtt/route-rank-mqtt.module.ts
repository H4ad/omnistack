import { Module } from '@nestjs/common';
import { MqttModule } from '../mqtt/mqtt.module';
import { RouteRankModule } from '../route-rank/route-rank.module';
import { RouteRankMqttService } from './services/route-rank-mqtt.service';

@Module({
  imports: [
    MqttModule,
    RouteRankModule,
  ],
  providers: [
    RouteRankMqttService,
  ],
})
export class RouteRankMqttModule {}
