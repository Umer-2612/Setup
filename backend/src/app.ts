import express from "express";
import compression from "compression";
import { EnvironmentFactory } from "./config/environments/environment.factory";
import { SecurityMiddleware } from "./shared/middlewares/security.middleware";
import { LoggingMiddleware } from "./shared/middlewares/logging.middleware";
import { DatabaseService } from "./infrastructure/database/database.service";
import { MongoDBConfig } from "./infrastructure/database/mongodb.config";
import { V1Router } from "./api/routes/v1";

export class App {
  private static instance: App;
  private app: express.Application;
  private env = EnvironmentFactory.getEnvironment();
  private dbService: DatabaseService;

  private constructor() {
    this.app = express();
    this.dbService = DatabaseService.getInstance(new MongoDBConfig());
    this.initialize();
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  private async initialize(): Promise<void> {
    try {
      // Initialize logging first
      LoggingMiddleware.configure(this.app);

      // Connect to database
      await this.dbService.connect();

      // Parse JSON bodies
      this.app.use(express.json());

      // Parse URL-encoded bodies
      this.app.use(express.urlencoded({ extended: true }));

      // Compress all responses
      this.app.use(compression());

      // Configure security middleware
      SecurityMiddleware.configure(this.app);

      // API Routes
      this.app.use("/api/v1", V1Router.getInstance().getRouter());

      // Basic health check endpoint
      this.app.get("/health", (req, res) => {
        res.status(200).json({
          status: "OK",
          timestamp: new Date().toISOString(),
          database: this.dbService.isConnectedToDatabase() ? "Connected" : "Disconnected",
        });
      });

      console.log("Application initialized successfully!");
    } catch (error) {
      console.error("Failed to initialize application:", error);
      process.exit(1);
    }
  }

  public async start(): Promise<void> {
    const port = this.env.getPort();

    this.app.listen(port, () => {
      console.log(
        `Server is running on port ${port} in ${this.env.getNodeEnv()} mode`
      );
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
