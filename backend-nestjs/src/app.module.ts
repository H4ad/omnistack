import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvModule } from './modules/env/env.module';
import { IncidentModule } from './modules/incidents/incident.module';
import { OngModule } from './modules/ong/ong.module';
import { TypeOrmService } from './modules/typeorm/services/type-orm.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    EnvModule,
    UserModule,
    OngModule,
    IncidentModule,
  ],
  controllers: [],
  providers: [
    EnvModule,
  ],
})
export class AppModule {}
