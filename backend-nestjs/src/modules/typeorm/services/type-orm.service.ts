//#region Imports

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { IncidentEntity } from '../../../typeorm/entities/incident.entity';
import { OngEntity } from '../../../typeorm/entities/ong.entity';
import { UserEntity } from '../../../typeorm/entities/user.entity';
import { EnvService } from '../../env/services/env.service';

//#endregion

/**
 * A classe que representa o serviço que constroi as configurações do Typeorm
 */
@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {

  //#region Constructor

  /**
   * Construtor padrão
   *
   * @param env O serviço que contém as configurações de ambiente
   */
  constructor(
    private readonly env: EnvService,
  ) { }

  //#endregion

  //#region Public Methods

  /**
   * Método que obtém as configurações para o Typeorm
   */
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    let options: TypeOrmModuleOptions = {
      database: this.env.DB_DATABASE,
      synchronize: this.env.DB_SYNCHRONIZE,
      migrationsRun: this.env.DB_MIGRATIONS_RUN,
      logging: this.env.isDevelopment,
      entities: [
        UserEntity,
        OngEntity,
        IncidentEntity,
      ],
      migrations: [
        __dirname + '/../../../typeorm/migrations/**/*{.ts,.js}',
      ],
    };

    if (this.env.DB_TYPE === 'mysql') {
      options = Object.assign(options, {
        type: 'mysql',
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
        keepConnectionAlive: true,
        host: this.env.DB_HOST,
        port: this.env.DB_PORT,
        username: this.env.DB_USER,
        password: this.env.DB_PASSWORD,
        acquireTimeout: this.env.DB_TIMEOUT,
      });
    } else if (this.env.DB_TYPE === 'postgres') {
      options = Object.assign(options, {
        type: 'postgres',
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
        keepConnectionAlive: true,
        host: this.env.DB_HOST,
        port: this.env.DB_PORT,
        username: this.env.DB_USER,
        password: this.env.DB_PASSWORD,
        acquireTimeout: this.env.DB_TIMEOUT,
        ...this.env.DB_IS_LOCAL && {
          rejectUnauthorized: false,
        },
        ...!this.env.DB_IS_LOCAL && {
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
    } else if (this.env.DB_TYPE === 'sqlite') {
      options = Object.assign(options, {
        type: 'sqlite',
      });
    } else 
      throw new InternalServerErrorException('Não há um outro tipo de banco de dados suportado, por favor, altere para MySQL o valor de DB_TYPE.');
    

    return options;
  }

  //#endregion

}
