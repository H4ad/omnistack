//#region Imports

import { Controller, Get, Query, Res, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginationOptions } from '../../../common/pagination.options';
import { ServiceUsageRankProxy } from '../models/service-usage-rank.proxy';
import { ServiceUsageRankService } from '../services/service-usage-rank.service';

//#endregion

@ApiTags('services')
@Controller('services')
export class ServiceUsageRankController {

  //#region Constructor

  constructor(
    protected readonly service: ServiceUsageRankService,
  ) {
  }

  //#endregion

  //#region Crud Methods

  @Get('/')
  @ApiOperation({ summary: 'List requests count by service.' })
  @ApiOkResponse({ type: ServiceUsageRankProxy, isArray: true })
  public async getMany(@Res() response: Response, @Query(new ValidationPipe({ whitelist: true, transform: true })) options?: PaginationOptions): Promise<void> {
    const [proxies, total] = await this.service.getMany(options);

    response.set('x-total-count', total.toString());
    response.send(proxies);
  }

  //#endregion

}
