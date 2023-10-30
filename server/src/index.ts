import 'reflect-metadata';
import express, { Request } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { ASTNode, GraphQLError, getOperationAST, print } from 'graphql';
import bodyParser from 'body-parser';
import { HOST, PORT } from '@environment';
import { initializeORM } from '@ORM';
import {
  AuthenticateRequestType,
  authenticateJWT,
  errorHandler,
  getStatusAndMessage,
  logRequest,
} from '@middlewares';
import logger from '@logger';
import { schema as buildSchema } from './createGraphqlSchema';

const GRAPHQL_PATH = '/graphql';

const app = express();

app.use(logRequest);
app.use(bodyParser.json());

const bootstrap = async () => {
  const schema = await buildSchema;

  app.use(
    GRAPHQL_PATH,
    authenticateJWT,
    graphqlHTTP((req) => ({
      extensions({ document, operationName }) {
        const operation = getOperationAST(document, operationName);
        const operationString = print(operation as ASTNode);

        logger.info(operationString);

        return {};
      },
      customFormatErrorFn(error) {
        const { errorMessage } = getStatusAndMessage(req as Request, error);

        return new GraphQLError(errorMessage);
      },
      schema,
      graphiql: true,
      context: { user: (req as AuthenticateRequestType).auth },
    })),
  );
};

initializeORM().then(async () => {
  await bootstrap();
  app.listen(PORT);
  logger.info(`Running a GraphQL API server at ${HOST}:${PORT}${GRAPHQL_PATH}`);

  app.use(errorHandler);
});
