//#region Imports

import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base-entity';
import { OngProxy } from '../../ong/models/ong.proxy';
import { OngEntity } from '../../ong/entities/ong.entity';

//#endregion

@Entity('users')
export class UserEntity extends BaseEntity {

  //#region Constructor

  constructor(partial: Partial<UserEntity>) {
    super();

    Object.assign(this, partial);
  }

  //#endregion

  //#region Public Properties

  @Column({ nullable: false, unique: true })
  public email!: string;

  @Column({ nullable: false })
  public password!: string;

  @Column({ nullable: false })
  public roles!: string;

  @OneToMany(() => OngEntity, ong => ong.user)
  public ongs!: OngEntity[];

  //#endregion

}
