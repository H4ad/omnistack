export const defaultConfig = () => ({
  NODE_ENV: process.env.NODE_ENV,
  ANALYTICS_BASE_PATH: process.env.API_BASE_PATH,
  ANALYTICS_PORT: parseInt(process.env.API_PORT!),
  ANALYTICS_SWAGGER_ENABLED: process.env.API_SWAGGER_ENABLED === 'true',
  ANALYTICS_SENTRY_DNS: process.env.API_SENTRY_DNS,
  ANALYTICS_ENABLE_LOGGING: process.env.API_ENABLE_LOGGING === 'true',
  MQTT_URL: process.env.MQTT_URL,
  MQTT_USERNAME: process.env.MQTT_USERNAME,
  MQTT_PASSWORD: process.env.MQTT_PASSWORD,
});
