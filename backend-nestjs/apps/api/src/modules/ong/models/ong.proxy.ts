//#region Imports

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseCrudProxy } from '../../../common/base-crud.proxy';
import { OngEntity } from '../entities/ong.entity';
import { isValid } from '../../../infra/utils/functions';
import { IncidentProxy } from '../../incidents/models/incidents.proxy';
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
    this.cases = Array.isArray(entity.cases) && entity.cases.map(incident => new IncidentProxy(incident)) || [];
  }

  //#endregion

  /**
   * O nome dessa ong
   */
  @ApiProperty()
  public name!: string;

  /**
   * O e-mail da ong
   */
  @ApiProperty()
  public email!: string;

  /**
   * A cidade na qual está localizada essa ong
   */
  @ApiProperty()
  public city!: string;

  /**
   * O estado na qual está localizada essa ong
   */
  @ApiProperty()
  public uf!: string;

  /**
   * O número de WhatsApp para entrar em contato com essa ong
   */
  @ApiProperty()
  public whatsapp!: string;

  /**
   * A identificação do usuário que controla essa ong
   */
  @ApiProperty()
  public userId!: number;

  /**
   * As informações sobre o usuário
   */
  @ApiPropertyOptional({ type: () => UserProxy })
  public user?: UserProxy;

  /**
   * Os casos que pertencem a essa ong
   */
  @ApiProperty({ type: () => IncidentProxy, isArray: true })
  public cases?: IncidentProxy[];

}
