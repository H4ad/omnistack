//#region Imports

import { InjectRedis } from '@app/redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Leaderboard } from 'redis-rank';
import { ServiceUsageRankProxy } from '../models/service-usage-rank.proxy';

//#endregion

@Injectable()
export class ServiceUsageRankRepository {

  //#region Constructor

  constructor(
    @InjectRedis()
    protected readonly redis: Redis,
  ) {
    this.leaderboard = new Leaderboard(
      this.redis,
      'api-usage',
      {
        updatePolicy: 'aggregate',
        sortPolicy: 'high-to-low',
      },
    );
  }

  //#endregion

  //#region Protected Properties

  protected readonly leaderboard: Leaderboard;

  //#endregion

  //#region Public Methods

  public async list(from: number, to: number): Promise<ServiceUsageRankProxy[]> {
    const results = await this.leaderboard.list(from, to);

    return results.map(result => new ServiceUsageRankProxy(result.rank, result.id, result.score));
  }

  public async getCount(): Promise<number> {
    return this.leaderboard.count();
  }

  public async incrementByService(service: string): Promise<void> {
    await this.leaderboard.update({
      id: service,
      value: 1,
    });
  }

  //#endregion

}
