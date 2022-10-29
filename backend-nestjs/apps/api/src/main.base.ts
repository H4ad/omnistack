//#region Imports

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { json } from 'body-parser';
import rateLimit from 'express-rate-limit';
import { dnsPrefetchControl, expectCt, frameguard, hidePoweredBy, hsts, ieNoOpen, noSniff } from 'helmet';
import { AppModule } from './app.module';
import { CatchAllFilter } from './filters/catch-all/catch-all.filter';

//#endregion

//#region Setup Methods

function setupSwagger(app: INestApplication, config: ConfigService): void {
  if (!config.get<boolean>('SWAGGER_ENABLED'))
    return;

  const swaggerOptions = new DocumentBuilder()
    .setTitle(config.get<string>('SWAGGER_TITLE') || 'API Base')
    .setDescription(config.get<string>('SWAGGER_DESCRIPTION') || '')
    .setVersion(config.get<string>('SWAGGER_VERSION') || '1.0')
    .addTag(config.get<string>('SWAGGER_TAG') || 'v1')
    .addBearerAuth({ type: 'http', name: 'Authorization' })
    .addServer('/', 'Dev')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup(`${ config.get<string>('API_BASE_PATH') }/swagger`, app, document);
}

function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
}

function setupMiddleware(app: INestApplication, config: ConfigService): void {
  app.use(dnsPrefetchControl());
  app.use(expectCt());
  app.use(frameguard());
  app.use(hidePoweredBy());
  app.use(hsts());
  app.use(ieNoOpen());
  app.use(noSniff());

  app.enableCors({
    exposedHeaders: '*',
  });

  app.use(json());

  if (config.get('NODE_ENV') === 'test')
    return;

  app.use(
    rateLimit({
      windowMs: 60_000, // 1 minute
      max: 40, // limit each IP to 100 requests per windowMs
    }),
  );
}

function setupFilters(app: INestApplication, config: ConfigService) {
  app.useGlobalFilters(new CatchAllFilter());

  if (!config.get<string>('SENTRY_DNS') || config.get<string>('NODE_ENV') === 'test')
    return;

  Sentry.init({ dsn: config.get<string>('SENTRY_DNS') });
}

//#endregion

export function setup(app: INestApplication): INestApplication {
  const config = app.get(ConfigService);

  setupSwagger(app, config);
  setupPipes(app);
  setupMiddleware(app, config);
  setupFilters(app, config);

  const basePath = config.get<string>('API_BASE_PATH');

  if (basePath)
    app.setGlobalPrefix(basePath);

  return app;
}

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  setup(app);

  return app;
}
