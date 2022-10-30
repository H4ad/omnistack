import { createMock } from '@golevelup/ts-jest';
import { Request } from 'express';
import { AnalyticsMqttClientInterface } from './analytics-mqtt-client.interface';
import { AnalyticsMqttClientService } from './analytics-mqtt-client.service';
import { createAnalyticsMiddleware } from './analytics.middleware';

describe(createAnalyticsMiddleware.name, () => {
  let middleware: (...args: Parameters<ReturnType<typeof createAnalyticsMiddleware>>) => Promise<void>;

  const mockedAnalyticsClientService: AnalyticsMqttClientInterface = createMock<AnalyticsMqttClientInterface>({ emitRequest: jest.fn() });

  beforeEach(() => {
    middleware = createAnalyticsMiddleware(mockedAnalyticsClientService);
  });

  it('should emit request', async () => {
    const method = 'POST';
    const path = '/test';

    let nextWasCalled = false;

    await middleware({
      method,
      originalUrl: path,
    } as unknown as Request, null as any, () => {
      nextWasCalled = true;
    });

    expect(nextWasCalled).toBe(true);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAnalyticsClientService.emitRequest).toHaveBeenCalledWith(method, path);
  });

  it('should call next even if emit throw error', async () => {
    const middleware = createAnalyticsMiddleware({
      emitRequest: () => {
        throw new Error('test');
      },
    } as unknown as AnalyticsMqttClientService);

    let nextWasCalled = false;

    await middleware({
      method: 'POST',
      originalUrl: '/test',
    } as unknown as Request, null as any, () => {
      nextWasCalled = true;
    });

    expect(nextWasCalled).toBe(true);
  });
});
