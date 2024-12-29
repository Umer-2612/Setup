import { IUser, IUserCreate } from '../interfaces/user.interface';
import { User } from '../models/user.model';
import { LoggerService } from '../../../shared/services/logger.service';

export class UserRepository {
    private static instance: UserRepository;
    private logger = LoggerService.getInstance();

    private constructor() {}

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    async create(userData: IUserCreate): Promise<IUser> {
        try {
            const user = new User(userData);
            await user.save();
            return user;
        } catch (error) {
            this.logger.error('Error creating user', error as Error);
            throw error;
        }
    }

    async findByEmail(email: string): Promise<IUser | null> {
        try {
            return User.findOne({ email });
        } catch (error) {
            this.logger.error('Error finding user by email', error as Error);
            throw error;
        }
    }

    async findById(id: string): Promise<IUser | null> {
        try {
            return User.findById(id);
        } catch (error) {
            this.logger.error('Error finding user by id', error as Error);
            throw error;
        }
    }

    async updateLastLogin(userId: string): Promise<void> {
        try {
            await User.findByIdAndUpdate(userId, {
                lastLogin: new Date()
            });
        } catch (error) {
            this.logger.error('Error updating last login', error as Error);
            throw error;
        }
    }
}
