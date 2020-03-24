//#region Imports

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import * as Sentry from '@sentry/minimal';

import { Request, Response } from 'express';

//#endregion

/**
 * A classe que representa o interceptor que captura erros e envia para a sentry.io
 */
@Catch()
export class SentryFilter implements ExceptionFilter {

  /**
   * Método que lida com as exceções lançadas
   *
   * @param exception A exceção que foi lançada
   * @param host Os argumentos de host
   */
  public async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = 500;
    let exceptionResponse;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      exceptionResponse = exception.getResponse();
    }

    Sentry.setContext('request', { requestUrl: request.url });

    if (status >= 500)
      Sentry.captureException(exception);

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(typeof exceptionResponse === 'object' && exceptionResponse),
      });
  }
}
