import { IEnvironment } from "./environment.interface";
import * as dotenv from "dotenv";

export abstract class Environment implements IEnvironment {
  constructor() {
    const nodeEnv = this.getNodeEnv();
    const envFile = nodeEnv === "test" ? ".env.test" : ".env";
    dotenv.config({ path: envFile });
  }

  getPort(): number {
    return parseInt(process.env.PORT || "3000", 10);
  }

  isProduction(): boolean {
    return this.getNodeEnv() === "production";
  }

  isDevelopment(): boolean {
    return this.getNodeEnv() === "development";
  }

  getNodeEnv(): string {
    return process.env.NODE_ENV || "development";
  }

  getCorsOrigins(): string[] {
    const origins = process.env.CORS_ORIGINS || "";
    return origins.split(",").map((origin) => origin.trim());
  }

  getRateLimit() {
    return {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10), // limit each IP to 100 requests per windowMs
    };
  }

  getLogLevel(): string {
    return process.env.LOG_LEVEL || "info";
  }

  getDatabaseConfig() {
    return {
      host: process.env.DB_HOST || "",
      username: process.env.DB_USERNAME || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "",
    };
  }

  getRedisConfig() {
    return {
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379", 10),
      password: process.env.REDIS_PASSWORD || null,
    };
  }

  getJwtConfig() {
    return {
      secret: process.env.JWT_SECRET || "your-secret-key",
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    };
  }
}
