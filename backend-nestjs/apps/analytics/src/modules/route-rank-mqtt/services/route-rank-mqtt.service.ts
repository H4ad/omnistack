//#region Imports

import { Injectable } from '@nestjs/common';
import { MqttService } from '../../mqtt/services/mqtt.service';
import { RouteRankService } from '../../route-rank/services/route-rank.service';

//#endregion

@Injectable()
export class RouteRankMqttService {

  //#region Constructor

  constructor(
    protected readonly mqtt: MqttService,
    protected readonly routeRankService: RouteRankService,
  ) {
    this.mqtt.events.on('request', async data => {
      await this.routeRankService.incrementRoute(data.service, data.method, data.path);
    });
  }

  //#endregion

}
