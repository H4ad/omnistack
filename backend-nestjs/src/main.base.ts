//#region Imports

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { json } from 'body-parser';
import rateLimit from 'express-rate-limit';
import { dnsPrefetchControl, expectCt, frameguard, hidePoweredBy, hsts, ieNoOpen, noSniff } from 'helmet';
import { AppModule } from './app.module';
import { SentryFilter } from './filters/sentryFilter';
import { EnvService } from './infra/core/env/services/env.service';

//#endregion

//#region Setup Methods

/**
 * Método que configura o Swagger para a aplicação
 *
 * @param app A instância da aplicação
 * @param env As configurações da aplicação
 */
function setupSwagger(app: INestApplication, env: EnvService): void {
  if (!env.SWAGGER_ENABLED)
    return;

  const swaggerOptions = new DocumentBuilder()
    .setTitle(env.SWAGGER_TITLE || 'API Base')
    .setDescription(env.SWAGGER_DESCRIPTION || '')
    .setVersion(env.SWAGGER_VERSION || '1.0')
    .addTag(env.SWAGGER_TAG || 'v1')
    .addBearerAuth({ type: 'http', name: 'Authorization' })
    .addServer('/', 'Dev')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup(`${ env.API_BASE_PATH }/swagger`, app, document);
}

/**
 * Método que configura os pipes globais
 *
 * @param app A instância da aplicação
 */
function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
}

/**
 * Método que configura os middleware da aplicação
 *
 * @param app A instância da aplicação
 * @param env As configurações da aplicação
 */
function setupMiddleware(app: INestApplication, env: EnvService): void {
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

  if (env.isTest)
    return;

  app.use(
    rateLimit({
      windowMs: 60_000, // 1 minute
      max: 40, // limit each IP to 100 requests per windowMs
    }),
  );
}

/**
 * Método que configura os filtros da aplicação
 *
 * @param app A instância da aplicação
 * @param config As configurações da aplicação
 */
function setupFilters(app: INestApplication, config: EnvService) {
  if (!config.SENTRY_DNS || config.isTest)
    return;

  Sentry.init({ dsn: config.SENTRY_DNS });

  app.useGlobalFilters(new SentryFilter());
}

//#endregion

/**
 * Método usado para inicializar a aplicação
 *
 * @param app A referência da aplicação
 */
export function setup(app: INestApplication): INestApplication {
  const env = app.get(EnvService);

  setupSwagger(app, env);
  setupPipes(app);
  setupMiddleware(app, env);
  setupFilters(app, env);

  if (env.API_BASE_PATH)
    app.setGlobalPrefix(env.API_BASE_PATH);

  return app;
}

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  setup(app);

  return app;
}
