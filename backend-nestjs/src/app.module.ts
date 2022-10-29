import { Module, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule } from './infra/core/env/env.module';
import { TypeOrmConfigModule } from './infra/core/typeorm/typeorm.config.module';
import { TypeormConfigService } from './infra/core/typeorm/typeorm.config.service';
import { AuthTokenModule } from './modules/auth/auth-token.module';
import { AuthRoutingModule } from './modules/auth/auth.routing.module';
import { IncidentRoutingModule } from './modules/incidents/incident.routing.module';
import { OngRoutingModule } from './modules/ong/ong.routing.module';
import { TestModule } from './modules/test/test.module';
import { UserRoutingModule } from './modules/user/user.routing.module';

const testModules: Type[] = [];

if (process.env.NODE_ENV === 'test')
  testModules.push(TestModule);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      inject: [TypeormConfigService],
      useFactory: (service: TypeormConfigService) => {
        return service.createTypeOrmOptions();
      },
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
