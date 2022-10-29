export const defaultConfig = () => ({
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_PATH: process.env.API_BASE_PATH,
  API_PORT: parseInt(process.env.API_PORT!),
  API_SWAGGER_ENABLED: process.env.API_SWAGGER_ENABLED === 'true',
  API_SENTRY_DNS: process.env.API_SENTRY_DNS,
  API_ENABLE_LOGGING: process.env.API_ENABLE_LOGGING === 'true',
});
