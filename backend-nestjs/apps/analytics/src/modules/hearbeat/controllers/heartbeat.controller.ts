//#region Imports

import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HeartbeatProxy } from '../models/heartbeat.proxy';
import { HeartbeatService } from '../services/hearbeat.service';

//#endregion

@ApiTags('heartbeats')
@Controller('heartbeats')
export class HeartbeatController {

  //#region Constructor

  constructor(
    protected readonly service: HeartbeatService,
  ) {
  }

  //#endregion

  //#region Crud Methods

  @Get('now')
  @ApiOperation({ summary: 'Get one hearbeat from another microservice.' })
  @ApiOkResponse({ type: HeartbeatProxy, isArray: true })
  public async getHeartbeat(): Promise<HeartbeatProxy> {
    return await this.service.getHeartbeat();
  }

  //#endregion

}
