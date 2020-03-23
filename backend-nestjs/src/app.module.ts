import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from './modules/env/env.module';
import { TypeOrmService } from './modules/typeorm/services/type-orm.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    EnvModule,
  ],
  controllers: [],
  providers: [
    EnvModule,
  ],
})
export class AppModule {}
