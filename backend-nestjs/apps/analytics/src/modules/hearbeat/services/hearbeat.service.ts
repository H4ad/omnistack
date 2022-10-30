//#region Imports

import { HeartbeatRedisClientInterface, InjectHeartbeatClient } from '@app/heartbeat-redis-client';
import { Injectable } from '@nestjs/common';
import { HeartbeatProxy } from '../models/heartbeat.proxy';

//#endregion

@Injectable()
export class HeartbeatService {

  //#region Constructor

  constructor(
    @InjectHeartbeatClient()
    protected readonly heartbeat: HeartbeatRedisClientInterface,
  ) {
  }

  //#endregion

  //#region Public Methods

  public async getHeartbeat(): Promise<HeartbeatProxy> {
    return new HeartbeatProxy(await this.heartbeat.getHeartbeat());
  }

  //#endregion

}
