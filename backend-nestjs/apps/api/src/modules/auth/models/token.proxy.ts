//#region Imports

import { ApiProperty } from '@nestjs/swagger';

//#endregion

/**
 * A classe que representa as informações de um token de autenticação
 */
export class TokenProxy {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(token: TokenProxy) {
    this.token = token.token;
    this.expiresAt = token.expiresAt;
  }

  //#endregion

  //#region Public Properties

  /**
   * O Bearer Token gerado pelo JWT
   */
  @ApiProperty()
  public token: string;

  /**
   * A data de quando irá expirar
   */
  @ApiProperty()
  public expiresAt: Date;

  //#endregion

}
