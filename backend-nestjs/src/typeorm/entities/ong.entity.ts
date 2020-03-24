//#region Imports

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../common/base-entity';
import { CaseEntity } from './case.entity';
import { UserEntity } from './user.entity';

//#endregion

/**
 * A class que representa a entidade que lida com as informações sobre as ongs
 */
@Entity('ongs')
export class OngEntity extends BaseEntity {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    partial: Partial<OngEntity> | OngEntity,
  ) {
    super();

    Object.assign(this, { ... partial });
  }

  //#endregion

  //#region Public Properties

  /**
   * O nome dessa ong
   */
  @Column({ nullable: false })
  public name: string;

  /**
   * A cidade na qual está localizada essa ong
   */
  @Column({ nullable: false })
  public city: string;

  /**
   * O estado na qual está localizada essa ong
   */
  @Column({ nullable: false })
  public state: string;

  /**
   * O número de WhatsApp para entrar em contato com essa ong
   */
  @Column({ nullable: false })
  public whatsapp: string;

  /**
   * A identificação do usuário que controla essa ong
   */
  @Column({ nullable: false })
  public userId: number;

  /**
   * As informações sobre o usuário
   */
  @ManyToOne(() => UserEntity, user => user.ongs)
  public user: UserEntity;

  /**
   * Os casos que pertencem a essa ong
   */
  @OneToMany(() => CaseEntity, u => u.ong)
  public cases: CaseEntity[];

  //#endregion

}