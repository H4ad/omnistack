import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { AuthTokenModule } from './auth-token.module';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy.service';
import { LocalStrategy } from './strategies/local.strategy.service';

@Module({
  imports: [
    AuthTokenModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
