//#region Imports

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeormEntities } from './entities';
import { TypeormMigrations } from './migrations';

//#endregion

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {

  //#region Constructor

  constructor(
    private readonly config: ConfigService,
  ) { }

  //#endregion

  //#region Public Methods

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    let options: TypeOrmModuleOptions = {
      name: 'service',
      database: this.config.getOrThrow<string>('DB_DATABASE'),
      synchronize: this.config.getOrThrow<boolean>('DB_SYNCHRONIZE'),
      migrationsRun: this.config.getOrThrow<boolean>('DB_MIGRATIONS_RUN'),
      logging: this.config.getOrThrow<boolean>('DB_LOGGING'),
      acquireTimeout: this.config.getOrThrow<number>('DB_TIMEOUT'),
      logger: 'advanced-console',
      entities: TypeormEntities,
      migrations: TypeormMigrations,
    };

    const type = this.config.getOrThrow<string>('DB_TYPE');
    const isDBLocal = this.config.get<boolean>('DB_IS_LOCAL');

    if (type === 'mysql') {
      options = Object.assign(options, {
        type: 'mysql',
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        url: this.config.get<string>('DATABASE_URL'),
        // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
        keepConnectionAlive: true,
        host: this.config.get<string>('DB_HOST'),
        port: this.config.get<string>('DB_PORT'),
        username: this.config.get<string>('DB_USER'),
        password: this.config.get<string>('DB_PASSWORD'),
        acquireTimeout: this.config.get<number>('DB_TIMEOUT'),
      });
    } else if (type === 'postgres') {
      options = Object.assign(options, {
        type: 'postgres',
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
        keepConnectionAlive: true,
        url: this.config.get<string>('DATABASE_URL'),
        host: this.config.get<string>('DB_HOST'),
        port: this.config.get<string>('DB_PORT'),
        username: this.config.get<string>('DB_USER'),
        password: this.config.get<string>('DB_PASSWORD'),
        acquireTimeout: this.config.get<number>('DB_TIMEOUT'),
        ...isDBLocal && {
          rejectUnauthorized: false,
        },
        ...!isDBLocal && {
          rejectUnauthorized: true,
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          ssl: {
            rejectUnauthorized: false,
          },
        },
      });
    } else if (type === 'sqlite') {
      options = Object.assign(options, {
        type: 'sqlite',
      });
    } else
      throw new InternalServerErrorException('Não há um outro tipo de banco de dados suportado, por favor, altere para MySQL o valor de DB_TYPE.');

    return options;
  }

  //#endregion

}
