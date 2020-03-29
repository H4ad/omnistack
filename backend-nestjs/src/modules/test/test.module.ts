import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TestController } from './controllers/test.controller';

@Module({
  controllers: [
    TestController,
  ],
  imports: [
    UserModule,
  ],
})
export class TestModule {}
