//#region Imports

import { Injectable } from '@nestjs/common';
import { MqttService } from '../../mqtt/services/mqtt.service';
import { ServiceUsageRankService } from '../../service-usage-rank/services/service-usage-rank.service';

//#endregion

@Injectable()
export class ServiceUsageRankMqttService {

  //#region Constructor

  constructor(
    protected readonly mqtt: MqttService,
    protected readonly serviceUsageRankService: ServiceUsageRankService,
  ) {
    this.mqtt.events.on('request', async data => {
      await this.serviceUsageRankService.incrementUsage(data.service);
    });
  }

  //#endregion

}
