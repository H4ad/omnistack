//#region Imports

import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import * as timeout from 'connect-timeout';

import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { SentryFilter } from './filters/sentryFilter';
import { EnvService } from './modules/env/services/env.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require('body-parser');

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
    .setTitle(env.SWAGGER_TITLE)
    .setDescription(env.SWAGGER_DESCRIPTION)
    .setVersion(env.SWAGGER_VERSION)
    .addTag(env.SWAGGER_TAG)
    .addBearerAuth({ type: 'http', name: 'Authorization' })
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
    }),
  );
}

/**
 * Mata a aplicação caso de timeout
 */
function haltOnTimeout(req, res, next) {
  if (req.timedout)
    throw new BadRequestException('A requisição durou tempo demais.');

  next();
}

/**
 * Método que configura os middleware da aplicação
 *
 * @param app A instância da aplicação
 * @param env As configurações da aplicação
 */
function setupMiddleware(app: INestApplication, env: EnvService): void {
  app.use(helmet());

  app.enableCors({
    exposedHeaders: '*',
  });

  app.use(bodyParser.json());

  app.use(timeout('30s'));

  app.use(haltOnTimeout);

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
export async function setup(app: INestApplication): Promise<INestApplication> {
  const env = await app.get(EnvService);

  setupSwagger(app, env);
  setupPipes(app);
  setupMiddleware(app, env);
  setupFilters(app, env);

  app.setGlobalPrefix(env.API_BASE_PATH);

  return app;
}

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  await setup(app);

  return app;
}

export async function createAppInit(): Promise<INestApplication> {
  const app = await createApp();

  await app.init();

  return app;
}
