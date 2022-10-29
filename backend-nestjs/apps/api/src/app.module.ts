import { Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultConfig } from './infra/config/default.config';
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
    ConfigModule.forRoot({
      cache: true,
      load: [
        defaultConfig,
      ],
    }),
    AuthRoutingModule,
    UserRoutingModule,
    OngRoutingModule,
    IncidentRoutingModule,
    ...testModules,
  ],
})
export class AppModule {}
