import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthRoutingModule {}
