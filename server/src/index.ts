import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { Options, graphqlHTTP } from 'express-graphql';
import { expressjwt, Request as JWTRequest } from 'express-jwt';
import { initializeORM } from './ORM';
import { PlaylistResolver } from './playlists/playlists.controller';
import { UserResolver } from './users/users.controller';
import { SongResolver } from './songs/songs.controller';
import { User } from './users/users.entity';
import {
  AuthenticateRequest,
  authenticateJWT,
} from './middlewares/authenticateJWT';

const PORT = 8000;
const GRAPHQL_PATH = '/graphql';
const JWT_SECRET = 'TypeGraphQL';

const app = express();

app.use(GRAPHQL_PATH, bodyParser.json(), authenticateJWT).use(authenticateJWT);

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [SongResolver, PlaylistResolver, UserResolver],
  });

  app.use(
    GRAPHQL_PATH,
    graphqlHTTP((req) => ({
      schema: schema,
      graphiql: true,
      context: { user: (req as AuthenticateRequest).auth },
    })),
  );
};

initializeORM().then(async () => {
  await bootstrap();
  app.listen(PORT);
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`,
  );
});
