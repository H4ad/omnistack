import { ClientProxy } from '@nestjs/microservices';

export type EventTyped<TName, TEventData, TArgs extends Array<any>, TOutput = void> = {
  listener: () => MethodDecorator;
  name: TName;

  validate: (data: unknown) => TEventData;
  createEventData: (...args: TArgs) => TEventData;

  sendEvent: (client: ClientProxy, data: TEventData) => Promise<TOutput>;
  handleEvent: (fn: () => Promise<TOutput>) => Promise<TOutput>;
}
