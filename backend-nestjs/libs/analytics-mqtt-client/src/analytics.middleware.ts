//#region Imports

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AnalyticsMqttClientService } from './analytics-mqtt-client.service';

//#endregion

@Injectable()
export class AnalyticsMiddleware implements NestMiddleware {

  //#region Constructor

  constructor(
    protected readonly analyticsMqttClientService: AnalyticsMqttClientService,
  ) {
  }

  //#endregion

  //#region Protected Properties

  protected readonly logger = new Logger(AnalyticsMiddleware.name);

  //#endregion

  public async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.analyticsMqttClientService.emitRequest(
        req.method,
        req.originalUrl,
      );
    } catch (e) {
      this.logger.error(e);
    } finally {
      next();
    }
  }
}
