import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { EnvironmentFactory } from "../../config/environments/environment.factory";

export class LoggerService {
  private static instance: LoggerService;
  private logger!: winston.Logger;  
  private env = EnvironmentFactory.getEnvironment();

  private constructor() {
    this.initializeLogger();
  }

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  private initializeLogger(): void {
    // Custom format for logs
    const logFormat = winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss.SSS"
      }),
      winston.format.errors({ stack: true }),
      winston.format.metadata(),
      winston.format.json()
    );

    // Configure transport for error logs
    const errorRotateTransport = new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "30d", // Keep logs for 30 days
      maxSize: "20m", // Rotate when file reaches 20MB
      format: logFormat,
      zippedArchive: true
    } as DailyRotateFile.DailyRotateFileTransportOptions);

    // Configure transport for combined logs
    const combinedRotateTransport = new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      maxSize: "20m",
      format: logFormat,
      zippedArchive: true
    } as DailyRotateFile.DailyRotateFileTransportOptions);

    // Configure transport for debug logs in development
    const debugRotateTransport = new DailyRotateFile({
      filename: "logs/debug-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "debug",
      maxFiles: "7d", // Keep debug logs for 7 days
      maxSize: "20m",
      format: logFormat,
      zippedArchive: true
    } as DailyRotateFile.DailyRotateFileTransportOptions);

    // Create logger instance
    this.logger = winston.createLogger({
      level: this.env.getLogLevel(),
      format: logFormat,
      defaultMeta: {
        service: "backend-service",
        environment: this.env.getNodeEnv()
      },
      transports: [
        // Write all logs with level 'error' and below to error-{date}.log
        errorRotateTransport,
        // Write all logs to combined-{date}.log
        combinedRotateTransport
      ]
    });

    // Add debug transport in development
    if (this.env.isDevelopment()) {
      this.logger.add(debugRotateTransport);
      
      // Also log to console in development
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        })
      );
    }

    // Handle transport errors
    [errorRotateTransport, combinedRotateTransport, debugRotateTransport].forEach(
      (transport) => {
        transport.on("error", (error) => {
          console.error("Transport error:", error);
        });
      }
    );
  }

  public getLogger(): winston.Logger {
    return this.logger;
  }

  // Convenience methods
  public info(message: string, meta?: Record<string, unknown>): void {
    this.logger.info(message, { metadata: meta });
  }

  public error(message: string, error?: Error | unknown, meta?: Record<string, unknown>): void {
    if (error instanceof Error) {
      this.logger.error(message, {
        metadata: {
          ...meta,
          error: {
            message: error.message,
            stack: error.stack,
            name: error.name
          }
        }
      });
    } else {
      this.logger.error(message, { metadata: { ...meta, error } });
    }
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(message, { metadata: meta });
  }

  public debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(message, { metadata: meta });
  }

  public http(message: string, meta?: Record<string, unknown>): void {
    this.logger.http(message, { metadata: meta });
  }
}
