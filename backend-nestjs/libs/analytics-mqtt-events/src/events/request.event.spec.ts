import { createMock } from '@golevelup/ts-jest';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';
import { REQUEST_EVENT } from './request.event';

describe('REQUEST_EVENT', () => {
  describe('name', () => {
    it('should have some name defined', () => {
      expect(REQUEST_EVENT.name).toBeDefined();
    });
  });

  describe('createEventData', () => {
    it('should create event data object', () => {
      const service = 'test';
      const method = 'POST';
      const path = 'test2';

      const test = REQUEST_EVENT.createEventData(service, method, path);

      expect(test).toHaveProperty('service', service);
      expect(test).toHaveProperty('method', method);
      expect(test).toHaveProperty('path', path);
    });

    it('should strip query params from path on event data object', () => {
      const service = 'test';
      const method = 'POST';
      const originalPath = '/test2';
      const path = `${ originalPath }?test=potato`;

      const test = REQUEST_EVENT.createEventData(service, method, path);

      expect(test).toHaveProperty('service', service);
      expect(test).toHaveProperty('method', method);
      expect(test).toHaveProperty('path', originalPath);
    });
  });

  describe('validate', () => {
    it('should validate correctly unkown object', () => {
      const unkownObject = {
        service: 'test',
        method: 'GET',
        path: '/users',
      };

      expect(() => REQUEST_EVENT.validate(unkownObject)).not.toThrow();

      const validated = REQUEST_EVENT.validate(unkownObject);

      expect(validated).toHaveProperty('service', unkownObject.service);
      expect(validated).toHaveProperty('method', unkownObject.method);
      expect(validated).toHaveProperty('path', unkownObject.path);
    });

    it('should throw if some property is invalid', () => {
      expect(() => REQUEST_EVENT.validate({ service: 233, method: 'POST', path: '/test' })).toThrow();
      expect(() => REQUEST_EVENT.validate({ service: 'test', method: 23, path: 'sdas' })).toThrow();
      expect(() => REQUEST_EVENT.validate({ service: 'test', method: 'GET', path: 22 })).toThrow();
    });
  });

  describe('sendEvent', () => {
    it('should emit event correctly', async () => {
      const client = createMock<ClientProxy>({
        emit: () => of(void 0),
      });

      const eventData = {
        service: 'test',
        method: 'POST',
        path: '/potato',
      };

      await REQUEST_EVENT.sendEvent(client, eventData);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(client.emit).toHaveBeenCalledWith(REQUEST_EVENT.name, eventData);
    });
  });
});
