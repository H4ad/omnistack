//#region Imports

import { Injectable } from '@nestjs/common';
import { PaginationOptions } from '../../../common/pagination.options';
import { ServiceUsageRankProxy } from '../models/service-usage-rank.proxy';
import { ServiceUsageRankRepository } from '../repositories/service-usage-rank.repository';

//#endregion

@Injectable()
export class ServiceUsageRankService {

  //#region Constructor

  constructor(
    protected readonly repository: ServiceUsageRankRepository,
  ) {
  }

  //#endregion

  //#region Public Methods

  public async getMany(options?: PaginationOptions): Promise<[ServiceUsageRankProxy[], number]> {
    const { page = 1, limit = 15 } = options || {};

    const normalizedLimit = Math.min(100, Math.max(1, limit));
    const normalizedPage = Math.max(1, page);

    const from = (normalizedPage - 1) * normalizedLimit;
    const to = normalizedPage * normalizedLimit;

    const proxies = await this.repository.list(from, to);
    const total = await this.repository.getCount();

    return [proxies, total];
  }

  public async incrementUsage(service: string): Promise<void> {
    await this.repository.incrementByService(service);
  }

  //#endregion

}
