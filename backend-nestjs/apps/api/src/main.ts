import { ConfigService } from '@nestjs/config';
import { createApp } from './main.base';

async function bootstrap() {
  const app = await createApp();
  const config = app.get(ConfigService);

  await app.listen(config.get('API_PORT') || 3000);
}

bootstrap();
