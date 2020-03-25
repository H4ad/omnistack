import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/services/env.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      inject: [EnvService],
      imports: [EnvModule],
      useFactory: async (config: EnvService) => ({
        defaultStrategy: config.API_DEFAULT_STRATEGY,
      }),
    }),
    JwtModule.registerAsync({
      inject: [EnvService],
      imports: [EnvModule],
      useFactory: async (configService: EnvService) => ({
        privateKey: configService.JWT_SECRET_KEY,
      }),
    }),
  ],
  exports: [
    PassportModule,
    JwtModule,
  ],
})
export class AuthTokenModule { }
