import { isUUID } from 'class-validator';
import { NextFunction, Response, Request } from 'express';
import jwt, { VerifyCallback } from 'jsonwebtoken';
import { User } from '../users/users.entity';

const JWT_SECRET = 'TypeGraphQL';

export type AuthenticateRequest = Request & { auth: User };

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

    jwt.verify(token, JWT_SECRET, ((err, user: User) => {
      if (err || !isUUID(user.id)) {
        return res.sendStatus(403);
      }

      (req as AuthenticateRequest).auth = user;
      next();
    }) as VerifyCallback);
  } else {
    res.sendStatus(401);
  }
};

export const getToken = (user: User | null) => {
  if (user) {
    return jwt.sign({ ...user }, JWT_SECRET);
  } else return null;
};
