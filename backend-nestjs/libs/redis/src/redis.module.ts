import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { DefaultRedisToken } from './tokens';

export type RedisOptionsAsync = RedisOptions & { url?: string };
export type RedisModuleOptions = Pick<DynamicModule, 'imports'> & Pick<FactoryProvider, 'inject'> & { useFactory: (...args: any[]) => RedisOptionsAsync };

@Module({})
export class RedisModule {
  static registerAsync(options: RedisModuleOptions, customProviderToken: symbol = DefaultRedisToken): DynamicModule {
    return {
      module: RedisModule,
      imports: options.imports,
      exports: [
        customProviderToken,
      ],
      providers: [
        {
          provide: customProviderToken,
          inject: options.inject,
          useFactory: (...args) => {
            const redisOptions = options.useFactory(...args);

            // ref: https://github.com/skunight/nestjs-redis/blob/master/lib/redis-client.provider.ts#L17
            if (redisOptions.url)
              return new Redis(redisOptions.url);

            return new Redis(redisOptions);
          },
        },
      ],
    };
  }
}
