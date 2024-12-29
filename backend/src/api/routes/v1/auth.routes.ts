import { Router, RequestHandler } from 'express';
import { AuthController } from '../../../components/auth/controllers/auth.controller';

export class AuthRoutes {
    private static instance: AuthRoutes;
    private router: Router;
    private authController: AuthController;

    private constructor() {
        this.router = Router();
        this.authController = AuthController.getInstance();
        this.initializeRoutes();
    }

    public static getInstance(): AuthRoutes {
        if (!AuthRoutes.instance) {
            AuthRoutes.instance = new AuthRoutes();
        }
        return AuthRoutes.instance;
    }

    private initializeRoutes(): void {
        // POST /api/v1/auth/signup
        this.router.post('/signup', this.authController.signup as RequestHandler);

        // POST /api/v1/auth/login
        this.router.post('/login', this.authController.login as RequestHandler);
    }

    public getRouter(): Router {
        return this.router;
    }
}
