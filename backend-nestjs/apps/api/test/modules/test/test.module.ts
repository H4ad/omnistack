import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { defaultConfig } from '../../../src/infra/config/default.config';
import { UserModule } from '../../../src/modules/user/user.module';
import { TestController } from './controllers/test.controller';

@Module({
  imports: [
    UserModule,
    ConfigModule.forFeature(defaultConfig),
  ],
  controllers: [
    TestController,
  ],
})
export class TestModule {}
