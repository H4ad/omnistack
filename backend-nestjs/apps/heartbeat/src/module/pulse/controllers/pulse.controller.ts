//#region Imports

import { HEARTBEAT_EVENT } from '@app/heartbeat-redis-events';
import { Controller } from '@nestjs/common';
import { PulseService } from '../services/pulse.service';

//#endregion

@Controller()
export class PulseController {

  //#region Constructor

  constructor(
    protected readonly service: PulseService,
  ) {
  }

  //#endregion

  //#region Public Methods

  @HEARTBEAT_EVENT.listener()
  public getPulse(): ReturnType<typeof HEARTBEAT_EVENT.handleEvent> {
    return HEARTBEAT_EVENT.handleEvent(() => {
      return this.service.getPulse();
    });
  }

  //#endregion

}
