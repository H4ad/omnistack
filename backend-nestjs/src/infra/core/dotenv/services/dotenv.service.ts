//#region Imports

import { InternalServerErrorException } from '@nestjs/common';
import * as envalid from 'envalid';
import { ValidatorSpec } from 'envalid';
import { IDotEnv } from '../models/dotenv';

//#endregion

export class DotenvService {

  //#region Public Methods

  public static getValidatedEnvs(referenceObject: object = process.env): IDotEnv {
    const dotEnvName = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

    type DotEnvValidation = { [key in keyof IDotEnv]: ValidatorSpec<any> };

    const rule: DotEnvValidation = {
      NODE_ENV: envalid.str(),
      API_BASE_PATH: envalid.str({ default: '' }),
      PORT: envalid.port({ default: 3000 }),
      API_DEFAULT_STRATEGY: envalid.str({ default: 'jwt' }),
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
      JWT_EXPIRES_IN: envalid.str({ default: '7d' }),
      JWT_SECRET_KEY: envalid.str({ devDefault: 'CHANGE_THIS_SECRET' }),
      SWAGGER_DESCRIPTION: envalid.str({ default: 'Base API' }),
      SWAGGER_TAG: envalid.str({ default: 'Base' }),
      SWAGGER_TITLE: envalid.str({ default: 'Base' }),
      SWAGGER_VERSION: envalid.str({ default: '1.0' }),
      SWAGGER_ENABLED: envalid.bool({ default: false }),
      SENTRY_DNS: envalid.str({ default: '' }),
    };
    const env = envalid.cleanEnv<IDotEnv>(referenceObject, rule, { dotEnvPath: dotEnvName, strict: true });

    if (env.isProduction && env.DB_SYNCHRONIZE)
      throw new InternalServerErrorException('Por questões de segurança, não será inicializado a API em modo produção com a configuração DB_SYNCHRONIZE sendo verdadeira. Veja: https://github.com/typeorm/typeorm/blob/master/docs/faq.md#how-do-i-update-a-database-schema');

    return env;
  }

  //#endregion

}
