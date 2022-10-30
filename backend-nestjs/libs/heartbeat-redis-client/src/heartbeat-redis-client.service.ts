//#region Imports

import { HeartbeatRedisClientInterface } from '@app/heartbeat-redis-client/heartbeat-redis-client.interface';
import { HEARTBEAT_EVENT } from '@app/heartbeat-redis-events';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectHeartbeatRedisClient } from './tokens';

//#endregion

@Injectable()
export class HeartbeatRedisClientService implements HeartbeatRedisClientInterface {

  //#region Constructor

  constructor(
    @InjectHeartbeatRedisClient()
    protected readonly client: ClientProxy,
  ) {
  }

  //#endregion

  //#region Public Methods

  public async getHeartbeat(): ReturnType<typeof HEARTBEAT_EVENT.sendEvent> {
    return await HEARTBEAT_EVENT.sendEvent(this.client, {});
  }

  //#endregion

}
