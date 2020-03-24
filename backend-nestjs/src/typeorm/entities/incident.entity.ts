//#region Imports

import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../common/base-entity';
import { OngEntity } from './ong.entity';

//#endregion

/**
 * A class que representa a entidade que lida com as informações de um incidente
 */
@Entity('incidents')
export class IncidentEntity extends BaseEntity {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    partial: Partial<IncidentEntity> | IncidentEntity,
  ) {
    super();

    Object.assign(this, { ... partial });
  }

  //#endregion

  //#region Public Properties

  /**
   * O titulo desse incidente
   */
  @Column({ nullable: false })
  public title: string;

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
