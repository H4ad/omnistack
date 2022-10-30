export const passportConfig = () => ({
  API_DEFAULT_STRATEGY: process.env.API_DEFAULT_STRATEGY,
});

export const jwtConfig = () => ({
  API_JWT_SECRET_KEY: process.env.API_DEFAULT_STRATEGY,
});

export const authConfig = () => ({
  API_JWT_EXPIRES_IN: process.env.API_JWT_EXPIRES_IN,
});
