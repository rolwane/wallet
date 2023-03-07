/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import BadRequestException from '../exceptions/BadRequestException';
import NotFoundException from '../exceptions/NotFoundException';
import ExceptionResponse from '../exceptions/ExceptionResponse';

class ExceptionHandler {

  public errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
    if (err instanceof BadRequestException) {
      const exceptionResponse = new ExceptionResponse(StatusCodes.BAD_REQUEST, 'Bad Request', err.message, Date.now());
      return res.status(StatusCodes.BAD_REQUEST).json(exceptionResponse);
    }

    if (err instanceof NotFoundException) {
      const exceptionResponse = new ExceptionResponse(StatusCodes.NOT_FOUND, 'Not Found', err.message, Date.now());
      return res.status(StatusCodes.BAD_REQUEST).json(exceptionResponse);
    }

    const exceptionResponse = new ExceptionResponse(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server Error', err.message, Date.now());
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(exceptionResponse);
  }

}

export default new ExceptionHandler();
