//#region Imports

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { OngEntity } from '../../../typeorm/entities/ong.entity';
import { UserEntity } from '../../../typeorm/entities/user.entity';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um usuário
 */
export class UserProxy extends BaseCrudProxy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    entity: UserEntity,
  ) {
    super(entity);

    this.email = entity.email;
    this.roles = entity.roles;
    // TODO: Refatorar para substituir por um proxy
    this.ongs = entity.ongs;
  }

  //#endregion

  /**
   * O e-mail do usuário
   */
  @ApiProperty()
  public email: string;

  /**
   * As permissões desse usuário
   */
  @ApiProperty()
  public roles: string;

  /**
   * A lista com as ongs na qual esse usuário tem controle
   */
  @ApiProperty({ type: () => OngEntity, isArray: true })
  @Type(() => OngEntity)
  public ongs: OngEntity[];

}
