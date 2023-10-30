import { DataSource } from 'typeorm';
import { ORM_CONNECTION } from '@environment';
import logger from '@logger';

export const ORM = new DataSource({
  type: 'postgres',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  ...ORM_CONNECTION,
});

export const initializeORM = async (): Promise<void> => {
  try {
    await ORM.initialize();

    logger.info('DB has been initialized!');
  } catch (error) {
    logger.error(`Error during DB initialization: \n${error}`);
  }
};
