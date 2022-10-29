import { createApp } from './main.base';
import { EnvService } from './infra/core/env/services/env.service';

async function bootstrap() {
  const app = await createApp();
  const config = app.get(EnvService);

  await app.listen(config.PORT || 3000);
}

bootstrap();
