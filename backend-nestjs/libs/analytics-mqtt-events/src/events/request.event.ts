import { BadRequestException } from '@nestjs/common';
import { EventTyped } from '../types';

export type RequestEventData = { service: string, method: string, path: string };

export const REQUEST_EVENT: EventTyped<'request', RequestEventData, [service: string, method: string, path: string]> = {
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
      path,
    };
  },
  createEventData: (service: string, method: string, path: string) => {
    return {
      service,
      method,
      path,
    };
  },
};
