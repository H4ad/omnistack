//#region Imports

import { InjectRedis } from '@app/redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Leaderboard } from 'redis-rank';
import { RouteRankProxy } from '../models/route-rank.proxy';

//#endregion

@Injectable()
export class RouteRankRepository {

  //#region Constructor

  constructor(
    @InjectRedis()
    protected readonly redis: Redis,
  ) {
  }

  //#endregion

  //#region Public Methods

  public async listByService(service: string, from: number, to: number): Promise<RouteRankProxy[]> {
    const leaderboard = this.getLeaderboardByService(service);

    const results = await leaderboard.list(from, to);

    return results.map(result => new RouteRankProxy(result.rank, result.id, result.score));
  }

  public async getCountByService(service: string): Promise<number> {
    const leaderboard = this.getLeaderboardByService(service);

    return await leaderboard.count();
  }

  public async incrementByService(service: string, method: string, path: string, amount: number): Promise<number[] | void[]> {
    const leaderboard = this.getLeaderboardByService(service);

    return leaderboard.update({
      id: this.getRouteKeyByMethodAndPath(method, path),
      value: amount,
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
