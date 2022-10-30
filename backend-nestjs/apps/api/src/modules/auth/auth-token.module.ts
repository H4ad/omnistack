import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig, passportConfig } from './auth.config';

@Module({
  imports: [
    PassportModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule.forFeature(passportConfig)],
      useFactory: (config: ConfigService) => ({
        defaultStrategy: config.getOrThrow<string>('API_DEFAULT_STRATEGY'),
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule.forFeature(jwtConfig)],
      useFactory: (config: ConfigService) => ({
        privateKey: config.getOrThrow<string>('API_JWT_SECRET_KEY'),
      }),
    }),
  ],
  exports: [
    PassportModule,
    JwtModule,
  ],
})
export class AuthTokenModule {}
