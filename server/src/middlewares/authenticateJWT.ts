import { NextFunction, Response, Request } from 'express';
import { VerifyCallback, verify, sign } from 'jsonwebtoken';
import { isUUID } from 'class-validator';
import logger from '@logger';
import { httpStatus } from '@data';
import { accessTokenSecret } from '@environment';
import { User } from '@users/users.entity';

export type AuthenticateRequestType = Request & { auth: User };

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const queryPath = req.query.query;

  if (
    !Object.values(req.query).length ||
    (typeof queryPath === 'string' &&
      (queryPath.includes('loginUser') || queryPath.includes('createUser')))
  ) {
    next();
    return;
  }

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    verify(token, accessTokenSecret, ((err, user: User) => {
      if (err || !isUUID(user.id)) {
        return res.sendStatus(httpStatus.FORBIDDEN);
      }

      (req as AuthenticateRequestType).auth = user;
      next();
    }) as VerifyCallback);
  } else {
    res.sendStatus(httpStatus.UNAUTHORIZED);
  }
};

export const getToken = (user: User | null) => {
  if (user) {
    logger.info('create token');
    return sign({ ...user }, accessTokenSecret);
  } else return null;
};
