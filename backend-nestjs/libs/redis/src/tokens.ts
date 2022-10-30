import { Inject } from '@nestjs/common';

export const DefaultRedisToken = Symbol('DefaultRedisToken');
export const InjectRedis = () => Inject(DefaultRedisToken);
