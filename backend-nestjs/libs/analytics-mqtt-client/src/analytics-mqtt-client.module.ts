import { DynamicModule, FactoryProvider, InjectionToken, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AnalyticsMqttClientService } from './analytics-mqtt-client.service';
import { AnalyticsServiceNameToken, MqttClientToken } from './tokens';

export type MQTTClientOptionsAsync = { url: string, username: string, password: string };
export type MQTTClientModuleOptions = Pick<DynamicModule, 'imports'> & Pick<FactoryProvider, 'inject'> & { service: string, useFactory: (...args: any[]) => MQTTClientOptionsAsync };

@Module({})
export class AnalyticsMqttClientModule {
  static registerAsync(options: MQTTClientModuleOptions, customProviderToken: InjectionToken = AnalyticsMqttClientService): DynamicModule {
    return {
      module: AnalyticsMqttClientModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: MqttClientToken,
            imports: options.imports,
            inject: options.inject,
            useFactory: (...args) => {
              const mqttOptions = options.useFactory(...args);

              return {
                transport: Transport.MQTT,
                options: mqttOptions,
              };
            },
          },
        ]),
      ],
      providers: [
        { provide: AnalyticsServiceNameToken, useValue: options.service },
        { provide: customProviderToken, useClass: AnalyticsMqttClientService },
      ],
      exports: [
        customProviderToken,
      ],
    };
  }
}
