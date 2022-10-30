import { HeartbeatRedisClientModule } from '@app/heartbeat-redis-client';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { heartbeatRedisClientConfig } from './heartbeat-redis-client.config';
import { HeartbeatService } from './services/hearbeat.service';

@Module({
  imports: [
    HeartbeatRedisClientModule.registerAsync({
      imports: [ConfigModule.forFeature(heartbeatRedisClientConfig)],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        url: config.getOrThrow('HEARTBEAT_REDIS_URL'),
      }),
    }),
  ],
  providers: [
    HeartbeatService,
  ],
  exports: [
    HeartbeatService,
  ],
})
export class HeartbeatModule {}
