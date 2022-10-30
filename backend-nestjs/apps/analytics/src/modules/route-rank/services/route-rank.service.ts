//#region Imports

import { Injectable } from '@nestjs/common';
import { PaginationOptions } from '../../../common/pagination.options';
import { RouteRankProxy } from '../models/route-rank.proxy';
import { RouteRankRepository } from '../repositories/route-rank.repository';

//#endregion

@Injectable()
export class RouteRankService {

  //#region Constructor

  constructor(
    protected readonly repository: RouteRankRepository,
  ) {
  }

  //#endregion

  //#region Public Methods

  public async getMany(service: string, options?: PaginationOptions): Promise<[RouteRankProxy[], number]> {
    const { page = 1, limit = 15 } = options || {};

    const normalizedLimit = Math.min(100, Math.max(1, limit));
    const normalizedPage = Math.max(1, page);

    const from = (normalizedPage - 1) * normalizedLimit;
    const to = normalizedPage * normalizedLimit;

    const proxies = await this.repository.listByService(service, from, to);
    const total = await this.repository.getCountByService(service);

    return [proxies, total];
  }

  public async incrementRoute(service: string, method: string, path: string): Promise<void> {
    await this.repository.incrementByService(service, method, path, 1);
  }

  //#endregion

}
