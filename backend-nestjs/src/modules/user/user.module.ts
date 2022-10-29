import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenModule } from '../auth/auth-token.module';
import { UserEntity } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [
    AuthTokenModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ],
  controllers: [
    UserController,
  ],
})
export class UserModule {}
