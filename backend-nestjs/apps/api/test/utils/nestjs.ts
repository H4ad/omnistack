//#region Imports

import { createMock } from '@golevelup/ts-jest';
import { Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsClientToken, AnalyticsMqttClientInterface } from '../../../../libs/analytics-mqtt-client/src';
import { defaultConfig } from '../../src/infra/config/default.config';
import { TypeormEntities } from '../../src/infra/core/typeorm/entities';
import { TypeormMigrations } from '../../src/infra/core/typeorm/migrations';
import { AuthRoutingModule } from '../../src/modules/auth/auth.routing.module';
import { setup } from '../../src/setup';
import { TestModule } from '../modules/test/test.module';
import '../patchs/fix-config-get';

//#endregion

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
    providers: [
      { provide: AnalyticsClientToken, useValue: createMock<AnalyticsMqttClientInterface>() },
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();

  setup(app);

  await app.init();

  return app;
}
