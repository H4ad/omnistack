import { EventTyped } from '@app/typed-events';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

export type HeartbeatEventData = Record<never, unknown>;
export type HeartbeatOutput = number;

export const HEARTBEAT_EVENT: EventTyped<'heartbeat', HeartbeatEventData, never, HeartbeatOutput> = {
  listener: () => MessagePattern(HEARTBEAT_EVENT.name, Transport.REDIS),
  name: 'heartbeat',
  validate: () => ({}),
  createEventData: () => ({}),
  sendEvent: async (client, data) => {
    return await firstValueFrom(client.send<HeartbeatOutput>(HEARTBEAT_EVENT.name, HEARTBEAT_EVENT.validate(data)).pipe(timeout(5_000)));
  },
  handleEvent: fn => fn(),
};
