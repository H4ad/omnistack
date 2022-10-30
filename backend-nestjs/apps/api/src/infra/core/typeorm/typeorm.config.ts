export const typeormConfig = () => ({
  DB_TYPE: process.env.DB_TYPE,
  DB_DATABASE: process.env.DB_DATABASE,
  DATABASE_URL: process.env.DATABASE_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: parseInt(process.env.DB_PORT ?? '0'),
  DB_USER: process.env.DB_USER,
  DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE === 'true',
  DB_MIGRATIONS_RUN: process.env.DB_MIGRATIONS_RUN === 'true',
  DB_TIMEOUT: parseInt(process.env.DB_TIMEOUT ?? '20_000'),
  DB_LOGGING: process.env.DB_LOGGING === 'true',
  DB_IS_LOCAL: process.env.DB_IS_LOCAL === 'true',
});
