//#region Imports

import { ApiProperty } from '@nestjs/swagger';

//#endregion

export class TokenProxy {

  //#region Constructor

  constructor(token: TokenProxy) {
    this.token = token.token;
    this.expiresAt = token.expiresAt;
  }

  //#endregion

  //#region Public Properties

  @ApiProperty()
  public token: string;

  @ApiProperty()
  public expiresAt: Date;

  //#endregion

}
