//#region Imports

import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';
import { OngProxy } from '../../modules/ong/models/ong.proxy';
import { OngEntity } from './ong.entity';

//#endregion

/**
 * A classe que representa a entidade que lida com os usuários
 */
@Entity('users')
export class UserEntity extends BaseEntity {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(partial: Partial<UserEntity>) {
    super();

    Object.assign(this, partial);
  }

  //#endregion

  //#region Public Properties

  /**
   * O e-mail do usuário
   */
  @Column({ nullable: false, unique: true })
  public email!: string;

  /**
   * A senha do usuário
   */
  @Column({ nullable: false })
  public password!: string;

  /**
   * As permissões desse usuário
   */
  @Column({ nullable: false })
  public roles!: string;

  /**
   * A lista com as ongs na qual esse usuário tem controle
   */
  @OneToMany(() => OngEntity, ong => ong.user)
  public ongs!: OngEntity[];

  //#endregion

}
