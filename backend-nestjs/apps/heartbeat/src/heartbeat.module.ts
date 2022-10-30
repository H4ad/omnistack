import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { defaultConfig } from './infra/core/config/default.config';
import { PulseRoutingModule } from './module/pulse/pulse.routing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [
        defaultConfig,
      ],
    }),
    PulseRoutingModule,
  ],
})
export class HeartbeatModule {}
