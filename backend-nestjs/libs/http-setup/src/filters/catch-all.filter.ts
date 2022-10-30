//#region Imports

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, Optional } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Request, Response } from 'express';

//#endregion

@Catch()
export class CatchAllFilter implements ExceptionFilter {

  //#region Constructor

  constructor(
    @Optional()
    protected readonly nodeEnv?: string,
    @Optional()
    protected readonly enableLogging?: boolean,
  ) {
  }

  //#endregion

  //#region Protected Properties

  protected readonly logger = new Logger(CatchAllFilter.name);

  //#endregion

  //#region Public Methods

  public async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = 500;
    let exceptionResponse: HttpException | unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      if (status === 401 && exception.message.includes('Unauthorized'))
        exceptionResponse = { message: 'You are not authorized to perform this action.' };
      else if (status === 429)
        exceptionResponse = { message: 'You have made too many requests in a very short period of time, please wait a few moments for you to make another request.' };
      else
        exceptionResponse = exception.getResponse();

    } else
      exceptionResponse = { exception };


    Sentry.setContext('request', {
      requestUrl: request.url,
      body: request.body,
      headers: request.headers,
    });

    Sentry.setTags({
      'statusCode': String(status),
      'X-Amzn-Trace-Id': request.headers['X-Amzn-Trace-Id'] as string,
    });

    if (status >= 500 && Sentry.getCurrentHub().getClient()) {
      Sentry.captureException(exception);

      await Sentry.flush(2000);
    }

    if (this.nodeEnv !== 'production') {
      if (!('toJSON' in Error.prototype)) {
        Object.defineProperty(Error.prototype, 'toJSON', {
          value() {
            const alt = {};

            Object.getOwnPropertyNames(this).forEach(function (key) {
              alt[key] = this[key];
            }, this);

            return alt;
          },
          configurable: true,
          writable: true,
        });
      }
    }

    if (this.enableLogging)
      this.logger.error(exceptionResponse);

    response
      .status(status)
      .send({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(typeof exceptionResponse === 'object' && exceptionResponse),
      });
  }

  //#endregion

}
