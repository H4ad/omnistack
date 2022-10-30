import { Type } from '@nestjs/common';
import { AnalyticsMqttClientModule, MQTTClientOptionsAsync } from './analytics-mqtt-client.module';
import { AnalyticsMqttClientService } from './analytics-mqtt-client.service';
import { AnalyticsClientToken, AnalyticsServiceNameToken } from './tokens';

describe(AnalyticsMqttClientModule.name, () => {
  it('should correctly create the module', () => {
    const service = 'test';
    const testImport = Symbol() as unknown as Type<any>;
    const testInject = Symbol() as unknown as Type<any>;
    const useFactory = jest.fn(() => ({}) as MQTTClientOptionsAsync);

    const dynamicModule = AnalyticsMqttClientModule.registerAsync({
      service,
      imports: [testImport],
      inject: [testInject],
      useFactory,
    });

    const defaultNameProvided = dynamicModule.providers?.find(provider => provider['provide'] === AnalyticsServiceNameToken);

    expect(defaultNameProvided).not.toBeUndefined();
    expect(defaultNameProvided).toHaveProperty('useValue', service);

    const defaultServiceProvided = dynamicModule.providers?.find(provider => provider['provide'] === AnalyticsClientToken);

    expect(defaultServiceProvided).not.toBeUndefined();
    expect(defaultServiceProvided).toHaveProperty('useClass', AnalyticsMqttClientService);

    const defaultServiceExported = dynamicModule.exports?.find(provider => provider === AnalyticsClientToken);

    expect(defaultServiceExported).not.toBeUndefined();
  });

  it('should correctly create the module when change provider token', () => {
    const service = 'test';
    const testImport = Symbol() as unknown as Type<any>;
    const testInject = Symbol() as unknown as Type<any>;
    const useFactory = jest.fn(() => ({}) as MQTTClientOptionsAsync);
    const customProviderToken = Symbol();

    const dynamicModule = AnalyticsMqttClientModule.registerAsync({
      service,
      imports: [testImport],
      inject: [testInject],
      useFactory,
    }, customProviderToken);

    const defaultServiceProvided = dynamicModule.providers?.find(provider => provider['provide'] === customProviderToken);

    expect(defaultServiceProvided).not.toBeUndefined();
    expect(defaultServiceProvided).toHaveProperty('useClass', AnalyticsMqttClientService);

    const defaultServiceExported = dynamicModule.exports?.find(provider => provider === customProviderToken);

    expect(defaultServiceExported).not.toBeUndefined();
  });
});
