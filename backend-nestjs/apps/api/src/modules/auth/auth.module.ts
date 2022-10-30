import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthTokenModule } from './auth-token.module';
import { authConfig } from './auth.config';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy.service';
import { LocalStrategy } from './strategies/local.strategy.service';

@Module({
  imports: [
    UserModule,
    AuthTokenModule,
    ConfigModule.forFeature(authConfig),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
