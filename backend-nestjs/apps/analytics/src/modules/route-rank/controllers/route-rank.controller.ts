//#region Imports

import { Controller, Get, Param, Query, Res, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginationOptions } from '../../../common/pagination.options';
import { RouteRankProxy } from '../models/route-rank.proxy';
import { RouteRankService } from '../services/route-rank.service';

//#endregion

@ApiTags('routes')
@Controller('routes')
export class RouteRankController {

  //#region Constructor

  /**
   * Construtor padrão
   */
  constructor(
    protected readonly service: RouteRankService,
  ) {
  }

  //#endregion

  //#region Crud Methods

  @Get('/:service')
  @ApiOperation({ summary: 'List requests count by route.' })
  @ApiOkResponse({ type: RouteRankProxy, isArray: true })
  @ApiParam({ name: 'service', type: String, example: 'api', required: true, description: 'The name of the service.' })
  public async getMany(@Res() response: Response, @Param('service') service: string, @Query(new ValidationPipe({ whitelist: true, transform: true })) options?: PaginationOptions): Promise<void> {
    const [proxies, total] = await this.service.getMany(service, options);

    response.set('x-total-count', total.toString());
    response.send(proxies);
  }

  //#endregion

}
