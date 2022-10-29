import * as envalid from 'envalid';
import { cleanEnv } from 'envalid';

export const typeormConfig = () => cleanEnv(process.env, {
  DB_TYPE: envalid.str({ default: 'mysql' }),
  DB_DATABASE: envalid.str({ default: 'dev' }),
  DATABASE_URL: envalid.str({ default: '' }),
  DB_HOST: envalid.str({ default: '', devDefault: 'localhost' }),
  DB_PASSWORD: envalid.str({ default: '', devDefault: '1234' }),
  DB_PORT: envalid.port({ default: 3306 }),
  DB_USER: envalid.str({ default: '', devDefault: 'root' }),
  DB_SYNCHRONIZE: envalid.bool({ default: false, devDefault: true }),
  DB_MIGRATIONS_RUN: envalid.bool({ default: true }),
  DB_TIMEOUT: envalid.num({ default: 20_000 }),
  DB_LOGGING: envalid.bool({ default: false, devDefault: true }),
  DB_IS_LOCAL: envalid.bool({ default: false, devDefault: true }),
});
