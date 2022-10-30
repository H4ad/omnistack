import { Module } from '@nestjs/common';
import { IncidentController } from './controllers/incident.controller';
import { IncidentModule } from './incident.module';

@Module({
  imports: [
    IncidentModule,
  ],
  controllers: [
    IncidentController,
  ],
})
export class IncidentRoutingModule {}
