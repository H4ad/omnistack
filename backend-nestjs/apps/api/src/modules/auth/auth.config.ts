export const passportConfig = () => ({
  API_DEFAULT_STRATEGY: process.env.API_DEFAULT_STRATEGY,
});

export const jwtConfig = () => ({
  JWT_SECRET_KEY: process.env.API_DEFAULT_STRATEGY,
});

export const authConfig = () => ({
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
});
