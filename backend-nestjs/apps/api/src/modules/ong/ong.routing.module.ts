import { Module } from '@nestjs/common';
import { OngController } from './controllers/ong.controller';
import { OngModule } from './ong.module';

@Module({
  imports: [
    OngModule,
  ],
  controllers: [
    OngController,
  ],
})
export class OngRoutingModule {}
