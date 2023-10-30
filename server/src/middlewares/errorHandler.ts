import { NextFunction, Request, Response } from 'express';
import { GraphQLError } from 'graphql';
import logger, { errorsStackLogger, reqLogPrefix } from '@logger';
import { httpStatus } from '@data';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const { errorMessage, status } = getStatusAndMessage(req, err);
  res.status(status).send(errorMessage);
};

export const getStatusAndMessage = (
  req: Request,
  err: Error,
): { errorMessage: string; status: number } => {
  const errorResponse = {
    errorMessage: 'Error occurred',
    status: httpStatus.INTERNAL_SERVER_ERROR,
  };

  if (err instanceof SyntaxError) {
    logger.warn(`${reqLogPrefix(req)} Request failed: ${err.toString()}`);
    errorResponse.errorMessage = 'Bad syntax';
    errorResponse.status = httpStatus.BAD_REQUEST;
  } else if (err instanceof GraphQLError) {
    logger.warn(`Request failed: ${err.message}`);
    errorResponse.errorMessage = err.message;
    errorResponse.status = httpStatus.BAD_REQUEST;
  } else {
    logger.error(`${reqLogPrefix(req)} Request failed: ${err.message}`);
    errorsStackLogger.error(err);
  }

  return errorResponse;
};
