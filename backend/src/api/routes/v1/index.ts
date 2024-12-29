import { Router } from 'express';
import { AuthRoutes } from './auth.routes';

export class V1Router {
    private static instance: V1Router;
    private router: Router;

    private constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    public static getInstance(): V1Router {
        if (!V1Router.instance) {
            V1Router.instance = new V1Router();
        }
        return V1Router.instance;
    }

    private initializeRoutes(): void {
        // Auth routes
        this.router.use('/auth', AuthRoutes.getInstance().getRouter());
    }

    public getRouter(): Router {
        return this.router;
    }
}
