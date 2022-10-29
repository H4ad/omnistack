import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OngModule } from '../ong/ong.module';
import { IncidentEntity } from './entities/incident.entity';
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
