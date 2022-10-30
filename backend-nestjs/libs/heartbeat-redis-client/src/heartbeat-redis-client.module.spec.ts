import { Type } from '@nestjs/common';
import { HeartbeatRedisClientModule, HeartbeatRedisClientOptionsAsync } from './heartbeat-redis-client.module';
import { HeartbeatRedisClientService } from './heartbeat-redis-client.service';
import { HeartbeatClientToken } from './tokens';

describe(HeartbeatRedisClientModule.name, () => {
  it('should correctly create the module', () => {
    const testImport = Symbol() as unknown as Type<any>;
    const testInject = Symbol() as unknown as Type<any>;
    const useFactory = jest.fn(() => ({}) as HeartbeatRedisClientOptionsAsync);

    const dynamicModule = HeartbeatRedisClientModule.registerAsync({
      imports: [testImport],
      inject: [testInject],
      useFactory,
    });

    const defaultServiceProvided = dynamicModule.providers?.find(provider => provider['provide'] === HeartbeatClientToken);

    expect(defaultServiceProvided).not.toBeUndefined();
    expect(defaultServiceProvided).toHaveProperty('useClass', HeartbeatRedisClientService);

    const defaultServiceExported = dynamicModule.exports?.find(provider => provider === HeartbeatClientToken);

    expect(defaultServiceExported).not.toBeUndefined();
  });

  it('should correctly create the module when change provider token', () => {
    const testImport = Symbol() as unknown as Type<any>;
    const testInject = Symbol() as unknown as Type<any>;
    const useFactory = jest.fn(() => ({}) as HeartbeatRedisClientOptionsAsync);
    const customProviderToken = Symbol();

    const dynamicModule = HeartbeatRedisClientModule.registerAsync({
      imports: [testImport],
      inject: [testInject],
      useFactory,
    }, customProviderToken);

    const defaultServiceProvided = dynamicModule.providers?.find(provider => provider['provide'] === customProviderToken);

    expect(defaultServiceProvided).not.toBeUndefined();
    expect(defaultServiceProvided).toHaveProperty('useClass', HeartbeatRedisClientService);

    const defaultServiceExported = dynamicModule.exports?.find(provider => provider === customProviderToken);

    expect(defaultServiceExported).not.toBeUndefined();
  });
});
