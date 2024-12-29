import { Environment } from './environment.abstract';

export class ProductionEnvironment extends Environment {
    constructor() {
        super();
    }

    // Override any production-specific configurations here
    getRateLimit() {
        return {
            windowMs: 900000, // 15 minutes
            max: 100 // stricter limit for production
        };
    }

    getLogLevel(): string {
        return 'error'; // Only log errors in production
    }
}
