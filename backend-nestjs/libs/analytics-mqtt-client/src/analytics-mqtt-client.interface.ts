//#region Imports

import { REQUEST_EVENT } from '@app/analytics-mqtt-events';

//#endregion

export interface AnalyticsMqttClientInterface {
  emitRequest(method: string, path: string): ReturnType<typeof REQUEST_EVENT.sendEvent>;
}
