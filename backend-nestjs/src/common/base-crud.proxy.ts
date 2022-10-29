//#region Imports

import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from './base-entity';

//#endregion

/**
 * A classe que representa as informações básicas de toda entidade que será enviada para o usuário
 */
export class BaseCrudProxy {

  //#region Constructor

  /**
   * Construtor padrão
   *
   * @param base As informações da entidade
   */
  constructor(base: BaseEntity) {
    this.id = base.id;
    this.createdAt = base.createdAt;
    this.updatedAt = base.updatedAt;
    this.isActive = base.isActive;
  }

  //#endregion

  //#region Public Properties

  /**
   * A identificação do post
   */
  @ApiPropertyOptional()
  public id: number;

  /**
   * Diz quando foi criado essa postagem
   */
  @ApiPropertyOptional()
  public createdAt: Date;

  /**
   * Diz quando foi atualizado essa postagem
   */
  @ApiPropertyOptional()
  public updatedAt: Date;

  /**
   * Diz se está ativo
   */
  @ApiPropertyOptional({ default: true })
  public isActive: boolean;

  //#endregion

}
