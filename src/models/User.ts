
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'staff' | 'admin';
    phone?: string;
    authType?: 'email' | 'google';
    googleId?: string;
    picture?: string;
    resetOtp?: string;
    resetOtpExpires?: number;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'staff', 'admin'], default: 'user' },
    phone: String,
    authType: { type: String, enum: ['email', 'google'], default: 'email' },
    googleId: String,
    picture: String,
    resetOtp: String,
    resetOtpExpires: Number
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
