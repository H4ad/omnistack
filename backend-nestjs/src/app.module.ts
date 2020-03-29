import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { AuthTokenModule } from './modules/auth/auth-token.module';
import { EnvModule } from './modules/env/env.module';
import { IncidentModule } from './modules/incidents/incident.module';
import { OngModule } from './modules/ong/ong.module';
import { TestModule } from './modules/test/test.module';
import { TypeOrmService } from './modules/typeorm/services/type-orm.service';
import { UserModule } from './modules/user/user.module';

const testModules = [];

if (process.env.NODE_ENV === 'test')
  testModules.push(TestModule);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    AuthModule,
    AuthTokenModule,
    EnvModule,
    UserModule,
    OngModule,
    IncidentModule,
    ...testModules,
  ],
  providers: [
    EnvModule,
  ],
})
export class AppModule {}
