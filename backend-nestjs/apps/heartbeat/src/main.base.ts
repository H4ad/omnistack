import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HeartbeatModule } from './heartbeat.module';

export async function createApp() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(HeartbeatModule, {
    transport: Transport.REDIS,
    options: {
      url: process.env.HEARTBEAT_REDIS_URL,
      retryAttempts: 3,
    },
  });

  return app;
}
