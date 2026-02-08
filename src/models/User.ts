
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'staff' | 'admin';
    phone?: string;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'staff', 'admin'], default: 'user' },
    phone: String,
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
