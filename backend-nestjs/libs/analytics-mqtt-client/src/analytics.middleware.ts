//#region Imports

import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AnalyticsMqttClientInterface } from '@app/analytics-mqtt-client';

//#endregion

export function createAnalyticsMiddleware(client: AnalyticsMqttClientInterface): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  const logger = new Logger('createAnalyticsMiddleware')

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await client.emitRequest(
        req.method,
        req.originalUrl,
      );
    } catch (e) {
      logger.error(e);
    } finally {
      next();
    }
  };
}

