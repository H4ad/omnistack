//#region Imports

import { ApiProperty } from '@nestjs/swagger';

//#endregion

export class HeartbeatProxy {

  //#region Constructor

  constructor(
    heartbeat: number,
  ) {
    this.heartbeat = new Date(heartbeat);
  }

  //#endregion

  //#region Public Properties

  @ApiProperty()
  public heartbeat: Date;

  //#endregion

}
