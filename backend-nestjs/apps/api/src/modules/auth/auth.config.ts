import * as envalid from 'envalid';
import { cleanEnv } from 'envalid';

export const passportConfig = () => cleanEnv(process.env, {
  API_DEFAULT_STRATEGY: envalid.str({ default: 'jwt' }),
});

export const jwtConfig = () => cleanEnv(process.env, {
  JWT_SECRET_KEY: envalid.str({ devDefault: 'CHANGE_THIS_SECRET' }),
});

export const authConfig = () => cleanEnv(process.env, {
  JWT_EXPIRES_IN: envalid.str({ default: '7d' }),
});
