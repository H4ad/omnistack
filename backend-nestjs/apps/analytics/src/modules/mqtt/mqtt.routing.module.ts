import { Module } from '@nestjs/common';
import { MqttController } from './controllers/mqtt.controller';
import { MqttModule } from './mqtt.module';

@Module({
  imports: [
    MqttModule,
  ],
  controllers: [
    MqttController,
  ],
})
export class MqttRoutingModule {}
