import { DataSource } from 'typeorm';
import { ORM_CONNECTION } from './environment';

export const ORM = new DataSource({
  type: 'postgres',
  entities: [__dirname + '/**/*.{entity,enums}{.ts,.js}'],
  ...ORM_CONNECTION,
});

export const initializeORM = async (): Promise<void> => {
  try {
    await ORM.initialize();

    console.info('DB has been initialized!');
  } catch (error) {
    console.error('Error during DB initialization: ');
    console.error(error);
  }
};
