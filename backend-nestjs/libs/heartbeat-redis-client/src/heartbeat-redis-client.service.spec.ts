import { HEARTBEAT_EVENT } from '@app/heartbeat-redis-events';
import { createMock } from '@golevelup/ts-jest';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { HeartbeatRedisClientService } from './heartbeat-redis-client.service';
import { HeartbeatRedisClientToken } from './tokens';

describe(HeartbeatRedisClientService.name, () => {
  let service: HeartbeatRedisClientService;

  const mockedReturnValue = Math.random();
  const mockedClientProxy: ClientProxy = createMock<ClientProxy>({
    send: jest.fn(() => of(mockedReturnValue)),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: HeartbeatRedisClientToken, useValue: mockedClientProxy },
        HeartbeatRedisClientService,
      ],
    }).compile();

    service = module.get<HeartbeatRedisClientService>(HeartbeatRedisClientService);
  });

  it('should get heartbeat correctly', async () => {
    const value = await service.getHeartbeat();

    expect(value).toEqual(mockedReturnValue);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedClientProxy.send).toHaveBeenCalledWith(HEARTBEAT_EVENT.name, {});
  });
});
