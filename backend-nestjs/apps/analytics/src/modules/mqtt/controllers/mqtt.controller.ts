//#region Imports

import { REQUEST_EVENT } from '@app/analytics-mqtt-events';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MqttService } from '../services/mqtt.service';

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

  @EventPattern(REQUEST_EVENT.name)
  public async onRequest(data: Record<string, unknown>): Promise<void> {
    const { service, method, path } = REQUEST_EVENT.validate(data);

    await this.mqtt.onRequest(service, method, path);
  }

  //#endregion
}
