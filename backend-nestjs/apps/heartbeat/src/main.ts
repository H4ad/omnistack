import { createApp } from './main.base';

async function bootstrap() {
  const app = await createApp();

  await app.listen();
}

bootstrap();
