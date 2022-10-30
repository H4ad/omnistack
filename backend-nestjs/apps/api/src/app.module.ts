import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultConfig } from './infra/config/default.config';
import { mqttClientConfig } from './infra/config/mqtt-client.config';
import { TypeOrmConfigModule } from './infra/core/typeorm/typeorm.config.module';
import { TypeormConfigService } from './infra/core/typeorm/typeorm.config.service';
import { AuthTokenModule } from './modules/auth/auth-token.module';
import { AuthRoutingModule } from './modules/auth/auth.routing.module';
import { IncidentRoutingModule } from './modules/incidents/incident.routing.module';
import { OngRoutingModule } from './modules/ong/ong.routing.module';
import { UserRoutingModule } from './modules/user/user.routing.module';
import { AnalyticsMqttClientModule } from '@app/analytics-mqtt-client';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [
        defaultConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      inject: [TypeormConfigService],
      useFactory: (service: TypeormConfigService) => {
        return service.createTypeOrmOptions();
      },
    }),
    AnalyticsMqttClientModule.registerAsync({
      service: 'api',
      imports: [ConfigModule.forFeature(mqttClientConfig)],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          url: config.getOrThrow('MQTT_URL'),
          username: config.getOrThrow('MQTT_USERNAME'),
          password: config.getOrThrow('MQTT_PASSWORD'),
        };
      },
    }),
    AuthTokenModule,
    AuthRoutingModule,
    UserRoutingModule,
    OngRoutingModule,
    IncidentRoutingModule,
  ],
})
export class AppModule {}
