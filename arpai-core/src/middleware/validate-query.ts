import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateQuery = <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.query);

    if (!parsed.success) {
      res.status(400).json({
        error: 'ValidationError',
        details: parsed.error.flatten()
      });
      return;
    }

    req.query = parsed.data as Request['query'];
    next();
  };
