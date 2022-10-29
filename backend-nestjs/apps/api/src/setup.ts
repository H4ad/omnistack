//#region Imports

import { setupDefaultHTTPConfiguration } from '@app/http-setup';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//#endregion

export function setup(app: INestApplication): INestApplication {
  const config = app.get(ConfigService);

  setupDefaultHTTPConfiguration(app, {
    nodeEnv: config.getOrThrow<string>('NODE_ENV'),
    apiBasePath: config.get<string>('API_BASE_PATH'),
    enableLogging: config.get<boolean>('API_ENABLE_LOGGING'),
    sentry: {
      dns: config.get<string>('API_SENTRY_DNS'),
    },
    rateLimit: {
      windowMs: 60_000,
      maxRequestsPerIp: 100,
    },
    swagger: {
      enabled: config.get<boolean>('API_SWAGGER_ENABLED') || false,
      title: 'API',
      tag: '1.0',
      description: 'The API that deals with basic crud operations',
      version: '1.0',
    },
  });

  return app;
}
