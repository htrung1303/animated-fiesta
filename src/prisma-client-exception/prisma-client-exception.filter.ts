import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message.replace(/\n/g, '');
    switch (exception.code) {
      case 'P2002':
        var status = HttpStatus.CONFLICT;
        handleException(`A unique constraint would be violated.`);
        break;
      case 'P2025':
        var status = HttpStatus.NOT_FOUND;
        handleException(`The record you are trying to access does not exist.`);
        break;
      case 'P2000':
        var status = HttpStatus.BAD_REQUEST;
        handleException(`An invalid value was specified for one of the query parameters in the request.`);
        break;
      default:
        super.catch(exception, host);
        break;
    }

    super.catch(exception, host);

    function handleException(message: String) {
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }
}
