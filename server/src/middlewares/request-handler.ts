import { NextFunction, Request, Response } from 'express';
import logger, { reqLogPrefix } from '@logger';

export const logRequest = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  logger.info(reqLogPrefix(req) + ' Received');

  next();
};
