//#region Imports

import { HEARTBEAT_EVENT } from '@app/heartbeat-redis-events';

//#endregion

export interface HeartbeatRedisClientInterface {
  getHeartbeat(): ReturnType<typeof HEARTBEAT_EVENT.sendEvent>;
}
