import 'dotenv/config';
import { logOptions, nodeEnv, ormConfig } from './types';

export const ORM_CONNECTION: ormConfig = Object.freeze({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.PASSWORD,
  database: process.env.DB_NAME ?? 'music_gram',
  schema: process.env.SCHEMA ?? 'public',
  synchronize: !!process.env.SYNCHRONIZE,
});

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? '';

export const NODE_ENV: nodeEnv = (process.env.NODE_ENV ??
  'development') as nodeEnv;

export const LOG_OPTIONS: logOptions = Object.freeze({
  filename: process.env.logFilename ?? 'C:/Logs/MusicGram/MusicGram.log',
  errorsFileName:
    process.env.errorsLogFilename ?? 'C:/Logs/MusicGram/MusicGramErrors.log',
  level: process.env.logLevel ?? 'debug',
  maxSize: parseInt(process.env.MAX_SIZE ?? '1000000'),
  maxFiles: parseInt(process.env.maxFiles ?? '50'),
  toFile: !!(process.env.logToFile ?? false),
});

export const PORT = +(process.env.PORT ?? 8000);
export const HOST = process.env.HOST ?? 'http://localhost';
