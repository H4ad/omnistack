//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from './base-entity';

//#endregion

export class BaseCrudProxy {

  //#region Constructor

  constructor(base: BaseEntity) {
    this.id = base.id;
    this.createdAt = base.createdAt;
    this.updatedAt = base.updatedAt;
    this.isActive = base.isActive;
  }

  //#endregion

  //#region Public Properties

  @ApiPropertyOptional()
  public id: number;

  @ApiPropertyOptional()
  public createdAt: Date;

  @ApiPropertyOptional()
  public updatedAt: Date;

  @ApiPropertyOptional({ default: true })
  public isActive: boolean;

  //#endregion

}
