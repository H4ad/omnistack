//#region Imports

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { IncidentEntity } from '../../incidents/entities/incident.entity';
import { UserEntity } from '../../user/entities/user.entity';

//#endregion

@Entity('ongs')
export class OngEntity extends BaseEntity {

  //#region Constructor

  constructor(
    partial: Partial<OngEntity> | OngEntity,
  ) {
    super();

    Object.assign(this, { ... partial });
  }

  //#endregion

  //#region Public Properties

  @Column({ nullable: false })
  public name!: string;

  @Column({ nullable: false })
  public email!: string;

  @Column({ nullable: false })
  public city!: string;

  @Column({ nullable: false, length: 2 })
  public uf!: string;

  @Column({ nullable: false })
  public whatsapp!: string;

  @Column({ nullable: false })
  public userId!: number;

  @ManyToOne(() => UserEntity, user => user.ongs)
  public user!: UserEntity;

  @OneToMany(() => IncidentEntity, u => u.ong)
  public cases!: IncidentEntity[];

  //#endregion

}
