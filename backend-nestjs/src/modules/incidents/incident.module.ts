import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentEntity } from '../../typeorm/entities/incident.entity';
import { OngModule } from '../ong/ong.module';
import { IncidentController } from './controllers/incident.controller';
import { IncidentService } from './services/incident.service';

@Module({
  imports: [
    OngModule,
    TypeOrmModule.forFeature([
      IncidentEntity,
    ]),
  ],
  providers: [
    IncidentService,
  ],
  exports: [
    IncidentService,
  ],
  controllers: [
    IncidentController,
  ],
})
export class IncidentModule {}
