import express from 'express';
import morgan from 'morgan';
import winston from 'winston';
import { EnvironmentFactory } from '../../config/environments/environment.factory';

export class LoggingMiddleware {
    private static logger: winston.Logger;

    public static configure(app: express.Application): void {
        const env = EnvironmentFactory.getEnvironment();

        // Configure Winston
        this.logger = winston.createLogger({
            level: env.getLogLevel(),
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            transports: [
                // Write all logs to console
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }),
                // Write all logs with level 'error' and below to error.log
                new winston.transports.File({ 
                    filename: 'logs/error.log', 
                    level: 'error',
                    dirname: 'logs' 
                }),
                // Write all logs to combined.log
                new winston.transports.File({ 
                    filename: 'logs/combined.log',
                    dirname: 'logs'
                })
            ]
        });

        // Use Morgan for HTTP request logging
        const morganFormat = env.isProduction() ? 'combined' : 'dev';
        app.use(morgan(morganFormat, {
            stream: {
                write: (message) => this.logger.info(message.trim())
            }
        }));

        // Add request logging middleware
        app.use((req, res, next) => {
            const start = Date.now();
            res.on('finish', () => {
                const duration = Date.now() - start;
                this.logger.info({
                    method: req.method,
                    url: req.url,
                    status: res.statusCode,
                    duration: `${duration}ms`,
                    userAgent: req.get('user-agent') || 'unknown',
                    ip: req.ip
                });
            });
            next();
        });
    }

    public static getLogger(): winston.Logger {
        return this.logger;
    }
}
