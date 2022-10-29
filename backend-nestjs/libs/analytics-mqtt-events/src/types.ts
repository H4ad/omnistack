export type EventTyped<TName, TEventData, TArgs extends Array<any>> = {
  name: TName;

  validate: (data: unknown) => TEventData;
  createEventData: (...args: TArgs) => TEventData;
}
