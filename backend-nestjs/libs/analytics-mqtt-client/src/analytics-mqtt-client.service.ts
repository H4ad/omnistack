import { REQUEST_EVENT } from '@app/analytics-mqtt-events';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { InjectAnalyticsServiceName, InjectMqttClient } from './tokens';

@Injectable()
export class AnalyticsMqttClientService {

  //#region Constructor

  constructor(
    @InjectMqttClient()
    protected readonly client: ClientProxy,
    @InjectAnalyticsServiceName()
    protected readonly service: string,
  ) {
  }

  //#endregion

  //#region Public Methods

  public async emitRequest(method: string, path: string): Promise<void> {
    await firstValueFrom(
      this.client.emit(REQUEST_EVENT.name, REQUEST_EVENT.createEventData(this.service, method, path)),
    );
  }

  //#endregion

}
