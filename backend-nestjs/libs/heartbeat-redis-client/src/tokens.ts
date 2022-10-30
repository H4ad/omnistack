import { Inject } from '@nestjs/common';

export const HeartbeatRedisClientToken = Symbol('HeartbeatRedisClientToken');
export const InjectHeartbeatRedisClient = () => Inject(HeartbeatRedisClientToken);

export const HeartbeatClientToken = Symbol('HeartbeatRedisClientToken');
export const InjectHeartbeatClient = () => Inject(HeartbeatClientToken);
