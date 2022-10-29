//#region Imports

import { Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultConfig } from '../../src/infra/config/default.config';
import { TypeormEntities } from '../../src/infra/core/typeorm/entities';
import { TypeormMigrations } from '../../src/infra/core/typeorm/migrations';
import { AuthRoutingModule } from '../../src/modules/auth/auth.routing.module';
import { setup } from '../../src/setup';
import { TestModule } from '../modules/test/test.module';
import '../patchs/fix-config-get';

//#endregion

/**
 * Método que retorna a instância do módulo global para os testes
 */
export async function getInstanceOfApplicationFor(modules: Type<any>[]) {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env.test',
        ignoreEnvVars: true,
        load: [
          defaultConfig,
        ],
      }),
      ...modules,
      AuthRoutingModule,
      TestModule,
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: TypeormEntities,
        migrations: TypeormMigrations,
        dropSchema: true,
      }),
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();

  await setup(app);

  await app.init();

  return app;
}
