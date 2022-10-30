import { ConfigService } from '@nestjs/config';
import { createAnalyticsApp } from './main.base';

async function bootstrap() {
  const app = await createAnalyticsApp();
  const config = app.get(ConfigService);

  await app.startAllMicroservices();
  await app.listen(config.get<number>('ANALYTICS_PORT') ?? 3001);
}

bootstrap();
