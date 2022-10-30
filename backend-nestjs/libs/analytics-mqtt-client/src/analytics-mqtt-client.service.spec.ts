import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AnalyticsMqttClientService } from './analytics-mqtt-client.service';
import { AnalyticsMqttClientToken, AnalyticsServiceNameToken } from './tokens';

describe(AnalyticsMqttClientService.name, () => {
  let service: AnalyticsMqttClientService;

  const mockedServiceName = 'test';
  const mockedClientProxy: ClientProxy = { emit: jest.fn(() => of(void 0)) } as unknown as ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AnalyticsServiceNameToken, useValue: mockedServiceName },
        { provide: AnalyticsMqttClientToken, useValue: mockedClientProxy },
        AnalyticsMqttClientService,
      ],
    }).compile();

    service = module.get<AnalyticsMqttClientService>(AnalyticsMqttClientService);
  });

  it('should emit correctly', async () => {
    const method = 'POST';
    const path = '/test';

    await service.emitRequest(method, path);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedClientProxy.emit).toHaveBeenCalledWith('request', {
      service: mockedServiceName,
      method,
      path,
    });
  });
});
