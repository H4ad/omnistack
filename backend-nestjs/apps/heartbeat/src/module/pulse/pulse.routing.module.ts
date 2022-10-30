import { Module } from '@nestjs/common';
import { PulseController } from './controllers/pulse.controller';
import { PulseModule } from './pulse.module';

@Module({
  imports: [
    PulseModule,
  ],
  controllers: [
    PulseController,
  ],
})
export class PulseRoutingModule {}
