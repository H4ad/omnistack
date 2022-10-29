//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { IncidentEntity } from '../entities/incident.entity';
import { isValid } from '../../../utils/functions';
import { OngProxy } from '../../ong/models/ong.proxy';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre um incidente
 */
export class IncidentProxy extends BaseCrudProxy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    entity: IncidentEntity,
  ) {
    super(entity);

    this.title = entity.title;
    this.description = entity.description;
    this.value = entity.value;
    this.ongId = entity.ongId;
    this.ong = isValid(entity.ong) && new OngProxy(entity.ong) || void 0;
  }

  //#endregion

  //#region Public Properties

  /**
   * O titulo desse incidente
   */
  @ApiProperty()
  public title: string;

  /**
   * A descrição desse caso
   */
  @ApiProperty()
  public description: string;

  /**
   * O valor para ajudar esse caso
   */
  @ApiProperty()
  public value: number;

  /**
   * A identificação da ong na qual esse caso pertence
   */
  @ApiProperty()
  public ongId: number;

  /**
   * As informações da ong na qual esse caso pertence
   */
  @ApiPropertyOptional({ type: () => OngProxy })
  public ong?: OngProxy;

  //#endregion

}
