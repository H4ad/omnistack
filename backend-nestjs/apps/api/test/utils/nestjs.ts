//#region Imports

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../src/app.module';
import { setup } from '../../src/main.base';

//#endregion

/**
 * Método que retorna a instância do módulo global para os testes
 */
export async function getInstanceOfApplication() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  await setup(app);

  await app.init();

  return app;
}
