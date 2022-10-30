//#region Imports

import { Controller } from '@nestjs/common';
import { MqttService } from '../services/mqtt.service';
import { REQUEST_EVENT } from '@app/analytics-mqtt-events';

//#endregion

@Controller()
export class MqttController {

  //#region Constructor

  constructor(
    protected readonly mqtt: MqttService,
  ) {
  }

  //#endregion

  //#region Event Methods

  @REQUEST_EVENT.listener()
  public async onRequest(data: Record<string, unknown>): ReturnType<typeof REQUEST_EVENT.handleEvent> {
    return REQUEST_EVENT.handleEvent(async () => {
      const { service, method, path } = REQUEST_EVENT.validate(data);

      await this.mqtt.onRequest(service, method, path);
    });
  }

  //#endregion
}
