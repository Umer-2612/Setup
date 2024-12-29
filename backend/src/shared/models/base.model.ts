import { Schema, Document } from 'mongoose';

export interface IBaseDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    isDeleted: boolean;
}

export const baseModelOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function(doc: any, ret: any) {
            delete ret.__v;
            ret.id = ret._id.toString();
            delete ret._id;
            return ret;
        }
    },
    toObject: {
        virtuals: true
    }
};

export const baseSchemaFields = {
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },
    deletedAt: {
        type: Date,
        default: null,
        select: false
    }
};

export abstract class BaseModel<T extends IBaseDocument> {
    protected abstract readonly model: any;

    async create(data: Partial<T>): Promise<T> {
        const created = new this.model(data);
        return created.save();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findOne({ _id: id, isDeleted: false });
    }

    async findOne(conditions: object): Promise<T | null> {
        return this.model.findOne({ ...conditions, isDeleted: false });
    }

    async find(conditions: object = {}): Promise<T[]> {
        return this.model.find({ ...conditions, isDeleted: false });
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { $set: data },
            { new: true }
        );
    }

    async softDelete(id: string): Promise<T | null> {
        return this.model.findOneAndUpdate(
            { _id: id, isDeleted: false },
            {
                $set: {
                    isDeleted: true,
                    deletedAt: new Date()
                }
            },
            { new: true }
        );
    }

    async hardDelete(id: string): Promise<boolean> {
        const result = await this.model.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }

    async count(conditions: object = {}): Promise<number> {
        return this.model.countDocuments({ ...conditions, isDeleted: false });
    }
}
