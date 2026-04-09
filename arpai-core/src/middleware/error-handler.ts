import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';
import { asAppError } from '../utils/errors';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  const appError = asAppError(err);

  if (env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(appError.statusCode).json({
    error: appError.code,
    message: appError.message,
    ...(env.NODE_ENV === 'production' ? {} : { details: appError.details })
  });
};
