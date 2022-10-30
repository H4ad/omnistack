//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { UserEntity } from '../entities/user.entity';
import { OngProxy } from '../../ong/models/ong.proxy';

//#endregion

export class UserProxy extends BaseCrudProxy {

  //#region Constructor

  constructor(
    entity: UserEntity,
  ) {
    super(entity);

    this.email = entity.email;
    this.roles = entity.roles;
    this.ongs = Array.isArray(entity.ongs) && entity.ongs.map(ong => new OngProxy(ong)) || [];
  }

  //#endregion

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public roles: string;

  @ApiProperty({ type: () => OngProxy, isArray: true })
  public ongs?: OngProxy[];

}
