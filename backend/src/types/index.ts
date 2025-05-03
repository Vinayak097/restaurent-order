import { Request, Response, NextFunction } from 'express';

export type RequestHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => any;

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    name: string;
  };
}
