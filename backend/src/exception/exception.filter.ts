import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {	
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const krTime = moment().format('YYYY-MM-DD:HH:mm:ss').toString();

    response	
      .status(status)
      .json({
        statusCode: status,
        requestBody: request.body,
        message: (exception as any).message,
        timestamp: krTime,
        path: request.url,
      });
  }
}