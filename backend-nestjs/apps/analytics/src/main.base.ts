//#region Imports

import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AnalyticsModule } from './analytics.module';
import { setup } from './setup';

//#endregion

export async function createAnalyticsApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AnalyticsModule, {
    logger: ['error', 'log', 'verbose', 'warn'],
  });
  const config = app.get(ConfigService);

  setup(app);

  const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: config.getOrThrow('MQTT_URL'),
      username: config.getOrThrow('MQTT_USERNAME'),
      password: config.getOrThrow('MQTT_PASSWORD'),
    },
  });

  return app;
}
