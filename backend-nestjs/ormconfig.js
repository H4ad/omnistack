const envalid = require('envalid');

const rule = {
  API_BASE_PATH: envalid.str({ default: 'prod', devDefault: 'dev' }),
  API_PORT: envalid.port({ default: 3000 }),
  API_DEFAULT_STRATEGY: envalid.str({ default: 'jwt' }),
  DB_TYPE: envalid.str({ default: 'mysql' }),
  DB_DATABASE: envalid.str({ devDefault: 'dev' }),
  DB_HOST: envalid.str({ default: '', devDefault: 'localhost' }),
  DB_PASSWORD: envalid.str({ default: '', devDefault: '1234' }),
  DB_PORT: envalid.port({ default: 3306 }),
  DB_USER: envalid.str({ default: '', devDefault: 'root' }),
  DB_SYNCHRONIZE: envalid.bool({ default: false, devDefault: true }),
  DB_MIGRATIONS_RUN: envalid.bool({ default: true }),
  SQLITE_DATABASE_HOST_PATH: envalid.str({ default: '' }),
  DB_TIMEOUT: envalid.num({ default: 20000 }),
  JWT_EXPIRES_IN: envalid.str({ default: '7d' }),
  JWT_SECRET_KEY: envalid.str({ devDefault: 'CHANGE_THIS_SECRET' }),
  SWAGGER_DESCRIPTION: envalid.str({ default: 'Base API' }),
  SWAGGER_TAG: envalid.str({ default: 'Base' }),
  SWAGGER_TITLE: envalid.str({ default: 'Base' }),
  SWAGGER_VERSION: envalid.str({ default: '1.0' }),
};

const env = envalid.cleanEnv(process.env, rule, { dotEnvPath: '.env', strict: true, });

const config = {
  type: env.DB_TYPE,
  database: env.DB_DATABASE,
  logging: env.isDevelopment,
  migrationsRun: env.DB_MIGRATIONS_RUN,
  acquireTimeout: env.DB_TIMEOUT,
  synchronize: env.DB_SYNCHRONIZE,
  entities: [
    'src/typeorm/entities/**/*{.ts,.js}',
  ],
  migrations: [
    'src/typeorm/migrations/**/*{.ts,.js}',
  ],
  cli: {
    entitiesDir: 'src/typeorm/entities',
    migrationsDir: 'src/typeorm/migrations',
  },
};

if (config.type === 'mysql')
  Object.assign(config, {
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    port: env.DB_PORT,
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
  });

if (env.DB_TYPE === 'postgres')
  Object.assign(config, {
    type: 'postgres',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
    keepConnectionAlive: true,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    acquireTimeout: env.DB_TIMEOUT,
    rejectUnauthorized: true,
    extra: {
      ssl: true,
    },
  });

module.exports = config;
