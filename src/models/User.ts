
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
    address?: string;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, // Emails might be optional if phone-first
    password: { type: String },
    role: { type: String, enum: ['user', 'staff', 'admin'], default: 'user' },
    phone: { type: String, unique: true, sparse: true }, // Phone is now key
    authType: { type: String, enum: ['email', 'google', 'phone'], default: 'email' },
    googleId: String,
    picture: String,
    resetOtp: String,
    resetOtpExpires: Number,
    address: String
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
