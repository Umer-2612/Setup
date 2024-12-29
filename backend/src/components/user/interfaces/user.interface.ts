import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    lastLogin?: Date;
    role: string;
    verificationToken?: string;
    isEmailVerified: boolean;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
    
    // Methods that will be implemented
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAuthToken(): string;
    toJSON(): Record<string, any>;
}

export interface IUserCreate {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
}
