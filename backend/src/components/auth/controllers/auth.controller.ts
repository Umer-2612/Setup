import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../../../shared/services/logger.service';

export class AuthController {
    private static instance: AuthController;
    private authService: AuthService;
    private logger = LoggerService.getInstance();

    private constructor() {
        this.authService = AuthService.getInstance();
    }

    public static getInstance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    signup = async (req: Request, res: Response) => {
        try {
            const { email, password, firstName, lastName } = req.body;
            
            const result = await this.authService.signup({
                email,
                password,
                firstName,
                lastName
            });

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result
            });
        } catch (error) {
            this.logger.error('Error in signup controller', error as Error);
            
            if ((error as Error).message === 'Email already registered') {
                return res.status(400).json({
                    success: false,
                    message: 'Email already registered'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            
            const result = await this.authService.login(email, password);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error) {
            this.logger.error('Error in login controller', error as Error);
            
            if ((error as Error).message === 'Invalid email or password') {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };
}
