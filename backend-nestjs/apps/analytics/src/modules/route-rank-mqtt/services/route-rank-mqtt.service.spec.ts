import { Test } from '@nestjs/testing';
import { MqttModule } from '../../mqtt/mqtt.module';
import { MqttService } from '../../mqtt/services/mqtt.service';
import { RouteRankService } from '../../route-rank/services/route-rank.service';
import { RouteRankMqttService } from './route-rank-mqtt.service';

describe(RouteRankMqttService.name, () => {
  let mqttService: MqttService;
  let routeRankMqttService: RouteRankService;

  beforeEach(async () => {
    routeRankMqttService = {
      incrementRoute: jest.fn(),
    } as unknown as RouteRankService;

    const app = await Test.createTestingModule({
      imports: [MqttModule],
      providers: [RouteRankMqttService],
    }).useMocker(token => {
      if (token === RouteRankService)
        return routeRankMqttService;

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
    expect(routeRankMqttService.incrementRoute).toHaveBeenCalledWith(expectedService, expectedMethod, expectedPath);
  });
});
