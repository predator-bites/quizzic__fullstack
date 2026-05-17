import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, ...err.errors });
    return;
  }

  console.error(err);
  res.status(500).json({ message: 'Internal server error', errors: [] });
};
