import * as envalid from 'envalid';
import { cleanEnv } from 'envalid';

export const defaultConfig = () => cleanEnv(process.env, {
  NODE_ENV: envalid.str(),
  API_BASE_PATH: envalid.str({ default: '' }),
  API_PORT: envalid.port({ default: 3000 }),
  SWAGGER_DESCRIPTION: envalid.str({ default: 'Base API' }),
  SWAGGER_TAG: envalid.str({ default: 'Base' }),
  SWAGGER_TITLE: envalid.str({ default: 'Base' }),
  SWAGGER_VERSION: envalid.str({ default: '1.0' }),
  SWAGGER_ENABLED: envalid.bool({ default: false }),
  SENTRY_DNS: envalid.str({ default: '' }),
});
