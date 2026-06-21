import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { ValidationError } from '@exceptions/AppError';

export const validate =
  (schema: ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = parsed.body ?? req.body;
      req.params = (parsed.params as any) ?? req.params;
      (req as any).validatedQuery = parsed.query ?? req.query;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formatted = err.issues.map((e) => ({
            field: e.path.join('.').replace('body.', ''),
            message: e.message,
          }));
        return next(new ValidationError('Validation failed', formatted));
      }
      next(err);
    }
  };