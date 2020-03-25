import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../typeorm/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { AuthTokenModule } from './auth-token.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy.service';
import { LocalStrategy } from './strategies/local.strategy.service';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
  ],
  controllers: [
    AuthController,
  ],
  imports: [
    AuthTokenModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
