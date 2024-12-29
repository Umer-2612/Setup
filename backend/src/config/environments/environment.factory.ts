import { IEnvironment } from './environment.interface';
import { DevelopmentEnvironment } from './development.environment';
import { ProductionEnvironment } from './production.environment';

export class EnvironmentFactory {
    private static instance: IEnvironment;

    public static getEnvironment(): IEnvironment {
        if (!EnvironmentFactory.instance) {
            const nodeEnv = process.env.NODE_ENV || 'development';

            switch (nodeEnv) {
                case 'production':
                    EnvironmentFactory.instance = new ProductionEnvironment();
                    break;
                case 'development':
                default:
                    EnvironmentFactory.instance = new DevelopmentEnvironment();
                    break;
            }
        }

        return EnvironmentFactory.instance;
    }
}
