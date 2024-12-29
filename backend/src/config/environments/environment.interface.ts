export interface IEnvironment {
  getPort(): number;
  isProduction(): boolean;
  isDevelopment(): boolean;
  getNodeEnv(): string;
  getCorsOrigins(): string[];
  getRateLimit(): {
    windowMs: number;
    max: number;
  };
  getLogLevel(): string;
  getDatabaseConfig(): {
    host: string;
    username: string;
    password: string;
    database: string;
  };
  getRedisConfig(): {
    host: string;
    port: number;
    password: string | null;
  };
  getJwtConfig(): {
    secret: string;
    expiresIn: string;
  };
}
