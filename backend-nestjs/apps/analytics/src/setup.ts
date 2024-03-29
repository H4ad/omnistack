import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupDefaultHTTPConfiguration } from '@app/http-setup';

export function setup(app: INestApplication): INestApplication {
  const config = app.get(ConfigService);

  setupDefaultHTTPConfiguration(app, {
    nodeEnv: config.getOrThrow<string>('NODE_ENV'),
    apiBasePath: config.get<string>('ANALYTICS_BASE_PATH'),
    enableLogging: config.get<boolean>('ANALYTICS_ENABLE_LOGGING'),
    sentry: {
      dns: config.get<string>('ANALYTICS_SENTRY_DNS'),
    },
    rateLimit: {
      windowMs: 60_000,
      maxRequestsPerIp: 100,
    },
    swagger: {
      enabled: config.get<boolean>('ANALYTICS_SWAGGER_ENABLED') || false,
      title: 'Analytics',
      tag: '1.0',
      description: 'The API that deals with the analytics aggregation.',
      version: '1.0',
    },
  });

  return app;
}
