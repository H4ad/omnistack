import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ioredisConfig } from './ioredis.config';

@Module({
  imports: [
    RedisModule.registerAsync({
      imports: [ConfigModule.forFeature(ioredisConfig)],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          url: config.getOrThrow('ANALYTICS_REDIS_URL'),
        };
      },
    }),
  ],
  exports: [
    RedisModule,
  ],
})
export class IoredisModule {}
