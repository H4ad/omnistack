//#region Imports

import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { OngEntity } from '../../ong/entities/ong.entity';

//#endregion

@Entity('incidents')
export class IncidentEntity extends BaseEntity {

  //#region Constructor

  constructor(
    partial: Partial<IncidentEntity> | IncidentEntity,
  ) {
    super();

    Object.assign(this, { ... partial });
  }

  //#endregion

  //#region Public Properties

  @Column({ nullable: false })
  public title!: string;

  @Column({ nullable: false, type: 'text' })
  public description!: string;

  @Column({ nullable: false, type: 'float' })
  public value!: number;

  @Column({ nullable: false })
  public ongId!: number;

  @ManyToOne(() => OngEntity, ong => ong.cases)
  public ong!: OngEntity;

  //#endregion

}
