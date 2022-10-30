import { DynamicModule, FactoryProvider, InjectionToken, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { HeartbeatRedisClientService } from './heartbeat-redis-client.service';
import { HeartbeatClientToken, HeartbeatRedisClientToken } from './tokens';

export type HeartbeatRedisClientOptionsAsync = RedisOptions['options'];
export type HeartbeatRedisClientModuleOptions = Pick<DynamicModule, 'imports'> & Pick<FactoryProvider, 'inject'> & { useFactory: (...args: any[]) => HeartbeatRedisClientOptionsAsync };

@Module({})
export class HeartbeatRedisClientModule {
  static registerAsync(options: HeartbeatRedisClientModuleOptions, customProviderToken: InjectionToken = HeartbeatClientToken): DynamicModule {
    return {
      module: HeartbeatRedisClientModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: HeartbeatRedisClientToken,
            imports: options.imports,
            inject: options.inject,
            useFactory: (...args) => {
              const redisOptions = options.useFactory(...args);

              return {
                transport: Transport.REDIS,
                options: redisOptions,
              };
            },
          },
        ]),
      ],
      providers: [
        { provide: customProviderToken, useClass: HeartbeatRedisClientService },
      ],
      exports: [
        customProviderToken,
      ],
    };
  }
}
