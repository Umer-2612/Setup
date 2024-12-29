import mongoose from "mongoose";
import { IDatabaseConfig } from "./database.interface";
import { LoggerService } from "../../shared/services/logger.service";

export class DatabaseService {
  private static instance: DatabaseService;
  private isConnected = false;
  private readonly logger = LoggerService.getInstance();

  private constructor(private readonly config: IDatabaseConfig) {}

  public static getInstance(config: IDatabaseConfig): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService(config);
    }
    return DatabaseService.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      this.logger.info("Database is already connected");
      return;
    }

    try {
      // Configure mongoose
      mongoose.set("strictQuery", true);

      const connectionString = this.config.getConnectionString();
      const options = this.config.getOptions();

      this.logger.debug("Attempting database connection", {
        options,
        // Mask sensitive information in connection string
        connectionString: connectionString.replace(
          /\/\/([^:]+):([^@]+)@/,
          "//***:***@"
        ),
      });

      // Connect to MongoDB
      await mongoose.connect(connectionString, options);

      this.isConnected = true;
      this.logger.info("Successfully connected to database");

      // Handle connection events
      this.handleConnectionEvents();
    } catch (error) {
      this.logger.error("Failed to connect to database", error as Error, {
        retryable: true,
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }

  private handleConnectionEvents(): void {
    mongoose.connection.on("connected", () => {
      this.logger.info("Mongoose connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      this.logger.error("Mongoose connection error", err as Error);
    });

    mongoose.connection.on("disconnected", () => {
      this.logger.warn("Mongoose disconnected from MongoDB", {
        timestamp: new Date().toISOString(),
        isConnected: this.isConnected,
      });
      this.isConnected = false;
    });

    // Handle application termination
    process.on("SIGINT", this.gracefulShutdown.bind(this));
    process.on("SIGTERM", this.gracefulShutdown.bind(this));
  }

  private async gracefulShutdown(): Promise<void> {
    try {
      await mongoose.connection.close();
      this.logger.info("MongoDB connection closed through app termination");
      process.exit(0);
    } catch (error) {
      this.logger.error("Error during database shutdown", error as Error);
      process.exit(1);
    }
  }

  public getConnection(): mongoose.Connection {
    return mongoose.connection;
  }

  public isConnectedToDatabase(): boolean {
    return this.isConnected;
  }
}
