import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setup } from './setup';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  setup(app);

  return app;
}
