import 'dotenv/config';

export const ORM_CONNECTION = Object.freeze({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.DB_NAME ?? 'postgres',
  password: process.env.PASSWORD,
  database: process.env.DB_NAME ?? 'music_gram',
  schema: process.env.SCHEMA ?? 'public',
  synchronize: !!process.env.SYNCHRONIZE,
});

export const accessTokenSecret = process.env.ACESS_TOKEN_SECRET ?? '';
