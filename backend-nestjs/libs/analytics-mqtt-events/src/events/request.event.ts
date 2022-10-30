import { EventTyped } from '@app/typed-events';
import { BadRequestException } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

export type RequestEventData = { service: string, method: string, path: string };

export const REQUEST_EVENT: EventTyped<'request', RequestEventData, [service: string, method: string, path: string]> = {
  listener: () => EventPattern(REQUEST_EVENT.name),
  name: 'request',
  validate: (data: unknown) => {
    if (!data || typeof data !== 'object')
      throw new BadRequestException();

    const service = data['service'];
    const method = data['method'];
    const path = data['path'];

    if (typeof service !== 'string' || typeof method !== 'string' || typeof path !== 'string')
      throw new BadRequestException('The arguments passed to this method are invalid.');

    return {
      service,
      method,
      path: path.split('?')[0],
    };
  },
  createEventData: (service: string, method: string, path: string) => {
    return REQUEST_EVENT.validate({
      service,
      method,
      path,
    });
  },
  sendEvent: async (client, data) => {
    await firstValueFrom(client.emit(REQUEST_EVENT.name, REQUEST_EVENT.validate(data)).pipe(timeout(5_000)));
  },
  handleEvent: fn => fn(),
};
