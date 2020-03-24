//#region Imports

import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../common/base-entity';
import { OngEntity } from './ong.entity';

//#endregion

/**
 * A class que representa a entidade que lida com as informações de um caso
 */
@Entity('cases')
export class CaseEntity extends BaseEntity {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    partial: Partial<CaseEntity> | CaseEntity,
  ) {
    super();

    Object.assign(this, { ... partial });
  }

  //#endregion

  //#region Public Properties

  /**
   * O resumo desse caso
   */
  @Column({ nullable: false })
  public case: string;

  /**
   * A descrição desse caso
   */
  @Column({ nullable: false, type: 'text' })
  public description: string;

  /**
   * O valor para ajudar esse caso
   */
  @Column({ nullable: false, type: 'float' })
  public value: number;

  /**
   * A identificação da ong na qual esse caso pertence
   */
  @Column({ nullable: false })
  public ongId: number;

  /**
   * As informações da ong na qual esse caso pertence
   */
  @ManyToOne(() => OngEntity, ong => ong.cases)
  public ong: OngEntity;

  //#endregion

}
