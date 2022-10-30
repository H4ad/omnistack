import { Test } from '@nestjs/testing';
import { MqttModule } from '../../mqtt/mqtt.module';
import { MqttService } from '../../mqtt/services/mqtt.service';
import { ServiceUsageRankService } from '../../service-usage-rank/services/service-usage-rank.service';
import { ServiceUsageRankMqttService } from './service-usage-rank-mqtt.service';

describe(ServiceUsageRankMqttService.name, () => {
  let mqttService: MqttService;
  let serviceUsageRankService: ServiceUsageRankService;

  beforeEach(async () => {
    serviceUsageRankService = {
      incrementUsage: jest.fn(),
    } as unknown as ServiceUsageRankService;

    const app = await Test.createTestingModule({
      imports: [MqttModule],
      providers: [ServiceUsageRankMqttService],
    }).useMocker(token => {
      if (token === ServiceUsageRankService)
        return serviceUsageRankService;

      return null;
    }).compile();

    mqttService = app.get(MqttService);
  });

  it('should call service on request event', async () => {
    const expectedService = 'test';
    const expectedMethod = 'POST';
    const expectedPath = '/test';

    await mqttService.onRequest(expectedService, expectedMethod, expectedPath);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(serviceUsageRankService.incrementUsage).toHaveBeenCalledWith(expectedService);
  });
});

