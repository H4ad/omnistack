import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { typeormConfig } from './typeorm.config';
import { TypeormConfigService } from './typeorm.config.service';

@Module({
  imports: [
    ConfigModule.forFeature(typeormConfig),
  ],
  exports: [
    TypeormConfigService,
  ],
  providers: [
    TypeormConfigService,
  ],
})
export class TypeOrmConfigModule {}
