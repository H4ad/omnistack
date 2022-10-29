import { Global, Module } from '@nestjs/common';
import { EnvService } from './services/env.service';

@Global()
@Module({
  providers: [
    {
      provide: EnvService,
      useFactory: () => EnvService.factory(),
      inject: [],
    },
  ],
  exports: [
    EnvService,
  ],
})
export class EnvModule {}
