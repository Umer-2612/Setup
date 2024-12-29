import { IDatabaseConfig } from "./database.interface";
import { EnvironmentFactory } from "../../config/environments/environment.factory";

export class MongoDBConfig implements IDatabaseConfig {
  private readonly env = EnvironmentFactory.getEnvironment();

  public getConnectionString(): string {
    const { host } = this.env.getDatabaseConfig();
    if (!host) {
      throw new Error("Database connection string is not configured");
    }
    return host;
  }

  public getOptions(): object {
    return {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: "majority"
    };
  }
}
