import { Request } from 'express';
import { AnalyticsMqttClientService } from './analytics-mqtt-client.service';
import { AnalyticsMiddleware } from './analytics.middleware';

describe(AnalyticsMiddleware.name, () => {
  let middleware: AnalyticsMiddleware;

  const mockedAnalyticsClientService: AnalyticsMqttClientService = { emitRequest: jest.fn() } as unknown as AnalyticsMqttClientService;

  beforeEach(() => {
    middleware = new AnalyticsMiddleware(mockedAnalyticsClientService);
  });

  it('should emit request', async () => {
    const method = 'POST';
    const path = '/test';

    let nextWasCalled = false;

    await middleware.use({
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
    const middleware = new AnalyticsMiddleware({
      emitRequest: () => {
        throw new Error('test');
      },
    } as unknown as AnalyticsMqttClientService);

    let nextWasCalled = false;

    await middleware.use({
      method: 'POST',
      originalUrl: '/test',
    } as unknown as Request, null as any, () => {
      nextWasCalled = true;
    });

    expect(nextWasCalled).toBe(true);
  });
});
