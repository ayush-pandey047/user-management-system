import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '@exceptions/AppError';
import logger from '@utils/logger';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`, { stack: err.stack });

  if (err instanceof ValidationError) {
    return res.status(422).json({ success: false, message: err.message, errors: err.errors });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = (err.meta?.target as string[])?.join(', ') || 'field';
      return res.status(409).json({ success: false, message: `${field} already exists` });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
};