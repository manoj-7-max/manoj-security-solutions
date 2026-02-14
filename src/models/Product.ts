
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    category: string;
    description: string;
    price: string;
    image: string;
    icon: string;
    stock: number;
    images: string[];
    variants: any[];
    createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    price: String,
    image: String, // Main image
    images: [String], // Gallery
    icon: String,
    stock: { type: Number, default: 0 },
    variants: [Schema.Types.Mixed],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
