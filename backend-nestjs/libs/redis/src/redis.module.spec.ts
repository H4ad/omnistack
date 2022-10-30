import { Type } from '@nestjs/common';
import { RedisModule, RedisOptionsAsync } from './redis.module';
import { DefaultRedisToken } from './tokens';

describe(RedisModule.name, () => {
  it('should correctly create the module', () => {
    const testImport = Symbol() as unknown as Type<any>;
    const testInject = Symbol() as unknown as Type<any>;
    const useFactory = jest.fn(() => ({}) as RedisOptionsAsync);

    const dynamicModule = RedisModule.registerAsync({
      imports: [testImport],
      inject: [testInject],
      useFactory,
    });

    const defaultRedisProvided = dynamicModule.providers?.find(provider => provider['provide'] === DefaultRedisToken);

    expect(defaultRedisProvided).not.toBeUndefined();
    expect(defaultRedisProvided).toHaveProperty('inject', [testInject]);

    expect(dynamicModule).toHaveProperty('imports', [testImport]);

    const defaultServiceExported = dynamicModule.exports?.find(provider => provider === DefaultRedisToken);

    expect(defaultServiceExported).not.toBeUndefined();
  });

  it('should correctly create the module when change provider token', () => {
    const useFactory = jest.fn(() => ({}) as RedisOptionsAsync);
    const customProvided = Symbol();

    const dynamicModule = RedisModule.registerAsync({
      imports: [],
      inject: [],
      useFactory,
    }, customProvided);

    const defaultRedisProvided = dynamicModule.providers?.find(provider => provider['provide'] === customProvided);
    expect(defaultRedisProvided).not.toBeUndefined();

    const defaultServiceExported = dynamicModule.exports?.find(provider => provider === customProvided);
    expect(defaultServiceExported).not.toBeUndefined();
  });
});
