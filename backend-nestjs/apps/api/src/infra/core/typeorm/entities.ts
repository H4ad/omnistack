import { Type } from '@nestjs/common';
import { IncidentEntity } from '../../../modules/incidents/entities/incident.entity';
import { OngEntity } from '../../../modules/ong/entities/ong.entity';
import { UserEntity } from '../../../modules/user/entities/user.entity';

export const TypeormEntities: Type[] = [
  UserEntity,
  OngEntity,
  IncidentEntity,
];
