import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OngEntity } from '../../typeorm/entities/ong.entity';
import { UserModule } from '../user/user.module';
import { OngController } from './controllers/ong.controller';
import { OngService } from './services/ong.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      OngEntity,
    ]),
  ],
  providers: [
    OngService,
  ],
  exports: [
    OngService,
  ],
  controllers: [
    OngController,
  ],
})
export class OngModule {}
