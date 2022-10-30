import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { json } from 'body-parser';
import rateLimit from 'express-rate-limit';
import { dnsPrefetchControl, expectCt, frameguard, hidePoweredBy, hsts, ieNoOpen, noSniff } from 'helmet';
import { CatchAllFilter } from './filters/catch-all.filter';
import { SetupConfig } from './setup.interface';

function setupSwagger(app: INestApplication, config: SetupConfig): void {
  if (!config.swagger.enabled)
    return;

  const swaggerOptions = new DocumentBuilder()
    .setTitle(config.swagger.title || 'API Base')
    .setDescription(config.swagger.description || '')
    .setVersion(config.swagger.version || '1.0')
    .addTag(config.swagger.tag || 'v1')
    .addBearerAuth({ type: 'http', name: 'Authorization' })
    .addServer('/', 'Dev')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup(`${ config.apiBasePath }/swagger`, app, document);
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

function setupMiddleware(app: INestApplication, config: SetupConfig): void {
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

  if (config.nodeEnv === 'test')
    return;

  app.use(
    rateLimit({
      windowMs: config.rateLimit.windowMs,
      max: config.rateLimit.maxRequestsPerIp,
    }),
  );
}

function setupFilters(app: INestApplication, config: SetupConfig) {
  app.useGlobalFilters(new CatchAllFilter(
    config.nodeEnv,
    config.enableLogging,
  ));

  if (!config.sentry?.dns || config.nodeEnv === 'test')
    return;

  Sentry.init({ dsn: config.sentry?.dns });
}

export function setupDefaultHTTPConfiguration(app: INestApplication, config: SetupConfig): INestApplication {
  setupSwagger(app, config);
  setupPipes(app);
  setupMiddleware(app, config);
  setupFilters(app, config);

  if (config.apiBasePath)
    app.setGlobalPrefix(config.apiBasePath);

  return app;
}
