//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { OngEntity } from '../entities/ong.entity';
import { isValid } from '../../../infra/utils/functions';
import { IncidentProxy } from '../../incidents/models/incidents.proxy';
import { UserProxy } from '../../user/models/user.proxy';

//#endregion

export class OngProxy extends BaseCrudProxy {

  //#region Constructor

  constructor(
    entity: OngEntity,
  ) {
    super(entity);

    this.name = entity.name;
    this.email = entity.email;
    this.city = entity.city;
    this.uf = entity.uf;
    this.whatsapp = entity.whatsapp;
    this.userId = entity.userId;
    this.user = isValid(entity.user) && new UserProxy(entity.user) || void 0;
    this.cases = Array.isArray(entity.cases) && entity.cases.map(incident => new IncidentProxy(incident)) || [];
  }

  //#endregion

  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public city!: string;

  @ApiProperty()
  public uf!: string;

  @ApiProperty()
  public whatsapp!: string;

  @ApiProperty()
  public userId!: number;

  @ApiPropertyOptional({ type: () => UserProxy })
  public user?: UserProxy;

  @ApiProperty({ type: () => IncidentProxy, isArray: true })
  public cases?: IncidentProxy[];

}
