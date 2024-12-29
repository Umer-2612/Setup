import { IUserCreate } from '../../user/interfaces/user.interface';
import { UserRepository } from '../../user/repositories/user.repository';
import { LoggerService } from '../../../shared/services/logger.service';

export class AuthService {
    private static instance: AuthService;
    private userRepository: UserRepository;
    private logger = LoggerService.getInstance();

    private constructor() {
        this.userRepository = UserRepository.getInstance();
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async signup(userData: IUserCreate) {
        try {
            // Check if user already exists
            const existingUser = await this.userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email already registered');
            }

            // Create new user
            const user = await this.userRepository.create(userData);
            
            // Generate auth token
            const token = user.generateAuthToken();

            return {
                user,
                token
            };
        } catch (error) {
            this.logger.error('Error in signup service', error as Error);
            throw error;
        }
    }

    async login(email: string, password: string) {
        try {
            // Find user by email
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Check password
            const isValidPassword = await user.comparePassword(password);
            if (!isValidPassword) {
                throw new Error('Invalid email or password');
            }

            // Update last login
            await this.userRepository.updateLastLogin(user.id);

            // Generate auth token
            const token = user.generateAuthToken();

            return {
                user,
                token
            };
        } catch (error) {
            this.logger.error('Error in login service', error as Error);
            throw error;
        }
    }
}
