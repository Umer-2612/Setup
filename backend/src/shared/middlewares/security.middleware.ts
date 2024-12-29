import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { EnvironmentFactory } from "../../config/environments/environment.factory";

export class SecurityMiddleware {
  public static configure(app: express.Application): void {
    const env = EnvironmentFactory.getEnvironment();

    // CORS configuration
    app.use(
      cors({
        origin: env.getCorsOrigins(),
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );

    // Helmet helps secure Express apps by setting various HTTP headers
    app.use(helmet());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: env.getRateLimit().windowMs,
      max: env.getRateLimit().max,
      message: "Too many requests from this IP, please try again later.",
    });

    // Apply rate limiter to all routes
    app.use(limiter);

    // Prevent HTTP Parameter Pollution attacks
    app.use((req, res, next) => {
      if (req.query) {
        for (let key in req.query) {
          if (Array.isArray(req.query[key])) {
            req.query[key] = req.query[key][0];
          }
        }
      }
      next();
    });
  }
}
