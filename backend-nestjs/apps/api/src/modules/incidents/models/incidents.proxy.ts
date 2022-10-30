//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { IncidentEntity } from '../entities/incident.entity';
import { isValid } from '../../../infra/utils/functions';
import { OngProxy } from '../../ong/models/ong.proxy';

//#endregion

export class IncidentProxy extends BaseCrudProxy {

  //#region Constructor

  constructor(
    entity: IncidentEntity,
  ) {
    super(entity);

    this.title = entity.title;
    this.description = entity.description;
    this.value = entity.value;
    this.ongId = entity.ongId;
    this.ong = isValid(entity.ong) && new OngProxy(entity.ong) || void 0;
  }

  //#endregion

  //#region Public Properties

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public value: number;

  @ApiProperty()
  public ongId: number;

  @ApiPropertyOptional({ type: () => OngProxy })
  public ong?: OngProxy;

  //#endregion

}
