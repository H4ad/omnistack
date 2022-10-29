import { InjectRedis } from '@app/redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Leaderboard } from 'redis-rank';
import { PaginationOptions } from '../../../common/pagination.options';
import { ServiceUsageRankProxy } from '../models/service-usage-rank.proxy';

@Injectable()
export class ServiceUsageRankService {

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

  public async getMany(options?: PaginationOptions): Promise<[ServiceUsageRankProxy[], number]> {
    const { page = 1, limit = 15 } = options || {};

    const normalizedLimit = Math.min(100, Math.max(1, limit));
    const normalizedPage = Math.max(1, page);

    const from = (normalizedPage - 1) * normalizedLimit;
    const to = normalizedPage * normalizedLimit;

    const results = await this.leaderboard.list(from, to);

    const proxies = results.map(result => new ServiceUsageRankProxy(result.rank, result.id, result.score));
    const total = await this.leaderboard.count();

    return [proxies, total];
  }

  public async incrementUsage(service: string): Promise<void> {
    await this.leaderboard.update({
      id: service,
      value: 1,
    });
  }

  //#endregion

}
