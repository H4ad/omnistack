import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { TypeormConfigService } from './typeorm.config.service';

@Module({
  imports: [
    EnvModule,
  ],
  exports: [
    TypeormConfigService,
  ],
  providers: [
    TypeormConfigService,
  ],
})
export class TypeOrmConfigModule {}
