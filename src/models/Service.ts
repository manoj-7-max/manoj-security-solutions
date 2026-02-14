
import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    name: string;
    description: string;
    basePrice: string;
    image?: string;
    icon?: string;
    category: string;
    duration?: string; // e.g., "2-4 hours"
}

const ServiceSchema = new Schema<IService>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    basePrice: { type: String, required: true },
    image: String,
    icon: String,
    category: { type: String, default: 'General' },
    duration: String
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
