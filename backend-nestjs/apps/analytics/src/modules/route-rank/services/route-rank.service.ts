import { InjectRedis } from '@app/redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Leaderboard } from 'redis-rank';
import { PaginationOptions } from '../../../common/pagination.options';
import { RouteRankProxy } from '../models/route-rank.proxy';

@Injectable()
export class RouteRankService {

  //#region Constructor

  constructor(
    @InjectRedis()
    protected readonly redis: Redis,
  ) {
  }

  //#endregion

  //#region Public Methods

  public async getMany(service: string, options?: PaginationOptions): Promise<[RouteRankProxy[], number]> {
    const leaderboard = this.getLeaderboardByService(service);

    const { page = 1, limit = 15 } = options || {};

    const normalizedLimit = Math.min(100, Math.max(1, limit));
    const normalizedPage = Math.max(1, page);

    const from = (normalizedPage - 1) * normalizedLimit;
    const to = normalizedPage * normalizedLimit;

    const results = await leaderboard.list(from, to);

    const proxies = results.map(result => new RouteRankProxy(result.rank, result.id, result.score));
    const total = await leaderboard.count();

    return [proxies, total];
  }

  public async incrementRoute(service: string, method: string, path: string): Promise<void> {
    const leaderboard = this.getLeaderboardByService(service);

    await leaderboard.update({
      id: this.getRouteKeyByMethodAndPath(method, path),
      value: 1,
    });
  }

  //#endregion

  //#region Protected Methods

  protected getLeaderboardByService(service: string): Leaderboard {
    return new Leaderboard(
      this.redis,
      `${ service }:routes`,
      {
        updatePolicy: 'aggregate',
        sortPolicy: 'high-to-low',
      },
    );
  }

  protected getRouteKeyByMethodAndPath(method: string, path: string): string {
    return `${ method.toUpperCase() }:${ path }`;
  }

  //#endregion

}
