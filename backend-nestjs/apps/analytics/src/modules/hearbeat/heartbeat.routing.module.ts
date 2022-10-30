import { Module } from '@nestjs/common';
import { HeartbeatController } from './controllers/heartbeat.controller';
import { HeartbeatModule } from './heartbeat.module';

@Module({
  imports: [
    HeartbeatModule,
  ],
  controllers: [
    HeartbeatController,
  ],
})
export class HeartbeatRoutingModule {}
