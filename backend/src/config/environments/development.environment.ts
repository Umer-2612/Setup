import { Environment } from "./environment.abstract";

export class DevelopmentEnvironment extends Environment {
  constructor() {
    super();
  }

  // Override any environment-specific configurations here
  getCorsOrigins(): string[] {
    return [
      "http://localhost:3000",
      "http://localhost:4200",
      "http://localhost:5173",
    ];
  }

  getRateLimit() {
    return {
      windowMs: 900000, // 15 minutes
      max: 1000, // higher limit for development
    };
  }
}
