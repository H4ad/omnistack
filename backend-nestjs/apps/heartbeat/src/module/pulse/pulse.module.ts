import { Module } from '@nestjs/common';
import { PulseService } from './services/pulse.service';

@Module({
  providers: [
    PulseService,
  ],
  exports: [
    PulseService,
  ],
})
export class PulseModule {}
