
import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    name: string;
    description: string;
    features: string[];
    image: string;
    icon: string;
}

const ServiceSchema = new Schema<IService>({
    name: { type: String, required: true },
    description: String,
    features: { type: [String], default: [] },
    image: String,
    icon: String,
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
