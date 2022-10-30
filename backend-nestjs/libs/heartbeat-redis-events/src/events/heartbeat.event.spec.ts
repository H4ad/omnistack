import { createMock } from '@golevelup/ts-jest';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';
import { HEARTBEAT_EVENT } from './heartbeat.event';

describe('HEARTBEAT_EVENT', () => {
  describe('name', () => {
    it('should have some name defined', () => {
      expect(HEARTBEAT_EVENT.name).toBeDefined();
    });
  });

  describe('createEventData', () => {
    it('should create event data object', () => {
      const test = HEARTBEAT_EVENT.createEventData();

      expect(test).toEqual({});
    });
  });

  describe('validate', () => {
    it('should validate correctly unkown object', () => {
      expect(() => HEARTBEAT_EVENT.validate({ test: true })).not.toThrow();

      const validated = HEARTBEAT_EVENT.validate(Math.random());

      expect(validated).toEqual({});
    });
  });

  describe('sendEvent', () => {
    it('should emit event correctly', async () => {
      const returnedValue = Math.random();
      const client = createMock<ClientProxy>({
        send: () => of(returnedValue),
      });

      const eventData = {};
      const resultData = await HEARTBEAT_EVENT.sendEvent(client, eventData);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(client.send).toHaveBeenCalledWith(HEARTBEAT_EVENT.name, eventData);
      expect(resultData).toEqual(returnedValue);
    });
  });
});
