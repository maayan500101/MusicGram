export type logOptions = Readonly<{
  filename: string;
  errorsFileName: string;
  level: string;
  maxSize: number;
  maxFiles: number;
  toFile: boolean;
}>;

export type ormConfig = Readonly<{
  username: string;
  password: string | undefined;
  database: string;
  port: number;
  schema: string;
  host: string;
  synchronize: boolean;
}>;

export type nodeEnv = 'development' | 'test' | 'production';
