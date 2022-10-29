import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentEntity } from '../../typeorm/entities/incident.entity';
import { OngModule } from '../ong/ong.module';
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
})
export class IncidentModule {}
