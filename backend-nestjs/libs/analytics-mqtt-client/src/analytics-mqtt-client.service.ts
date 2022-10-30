//#region Imports

import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectAnalyticsMqttClient, InjectAnalyticsServiceName } from './tokens';
import { REQUEST_EVENT } from '@app/analytics-mqtt-events';
import { AnalyticsMqttClientInterface } from '@app/analytics-mqtt-client';

//#endregion

@Injectable()
export class AnalyticsMqttClientService implements AnalyticsMqttClientInterface {

  //#region Constructor

  constructor(
    @InjectAnalyticsMqttClient()
    protected readonly client: ClientProxy,
    @InjectAnalyticsServiceName()
    protected readonly service: string,
  ) {
  }

  //#endregion

  //#region Public Methods

  public async emitRequest(method: string, path: string): ReturnType<typeof REQUEST_EVENT.sendEvent> {
    await REQUEST_EVENT.sendEvent(this.client, {
      service: this.service,
      method,
      path,
    });
  }

  //#endregion

}
