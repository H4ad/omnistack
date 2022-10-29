import { Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenModule } from './modules/auth/auth-token.module';
import { AuthRoutingModule } from './modules/auth/auth.routing.module';
import { EnvModule } from './modules/env/env.module';
import { IncidentRoutingModule } from './modules/incidents/incident.routing.module';
import { OngRoutingModule } from './modules/ong/ong.routing.module';
import { TestModule } from './modules/test/test.module';
import { TypeOrmService } from './modules/typeorm/services/type-orm.service';
import { UserRoutingModule } from './modules/user/user.routing.module';

const testModules: Type[] = [];

if (process.env.NODE_ENV === 'test')
  testModules.push(TestModule);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    AuthTokenModule,
    EnvModule,
    AuthRoutingModule,
    UserRoutingModule,
    OngRoutingModule,
    IncidentRoutingModule,
    ...testModules,
  ],
  providers: [
    EnvModule,
  ],
})
export class AppModule {}
