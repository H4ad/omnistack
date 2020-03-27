//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { IncidentEntity } from '../../../typeorm/entities/incident.entity';
import { OngEntity } from '../../../typeorm/entities/ong.entity';
import { isValid } from '../../../utils/functions';
import { UserProxy } from '../../user/models/user.proxy';

//#endregion

/**
 * A classe que representa as informações que são enviadas pela API sobre uma ong
 */
export class OngProxy extends BaseCrudProxy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    entity: OngEntity,
  ) {
    super(entity);

    this.name = entity.name;
    this.email = entity.email;
    this.city = entity.city;
    this.uf = entity.uf;
    this.whatsapp = entity.whatsapp;
    this.userId = entity.userId;
    this.user = isValid(entity.user) && new UserProxy(entity.user) || void 0;
    // TODO: Alternar para um proxy
    this.cases = entity.cases || [];
  }

  //#endregion

  /**
   * O nome dessa ong
   */
  @ApiProperty()
  public name: string;

  /**
   * O e-mail da ong
   */
  @ApiProperty()
  public email: string;
  
  /**
   * A cidade na qual está localizada essa ong
   */
  @ApiProperty()
  public city: string;

  /**
   * O estado na qual está localizada essa ong
   */
  @ApiProperty()
  public uf: string;

  /**
   * O número de WhatsApp para entrar em contato com essa ong
   */
  @ApiProperty()
  public whatsapp: string;

  /**
   * A identificação do usuário que controla essa ong
   */
  @ApiProperty()
  public userId: number;

  /**
   * As informações sobre o usuário
   */
  @ApiPropertyOptional({ type: () => UserProxy })
  @Type(() => UserProxy)
  public user: UserProxy;

  /**
   * Os casos que pertencem a essa ong
   */
  @ApiProperty({ type: () => IncidentEntity, isArray: true })
  @Type(() => IncidentEntity)
  public cases: IncidentEntity[];

}
