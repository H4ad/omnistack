import { Injectable } from '@nestjs/common';
import Emittery from 'emittery';

export type MQTTEvents = {
  request: {
    service: string;
    method: string;
    path: string;
  }
}

@Injectable()
export class MqttService {

  //#region Protected Properties

  protected readonly emittery: Emittery<MQTTEvents> = new Emittery<MQTTEvents>();

  //#endregion

  //#region Getters

  public get events(): Omit<typeof this.emittery, 'emit'> {
    return this.emittery;
  }

  //#endregion

  //#region Public Methods

  public async onRequest(service: string, method: string, path: string): Promise<void> {
    await this.emittery.emit('request', {
      service,
      method,
      path,
    });
  }

  //#endregion

}
