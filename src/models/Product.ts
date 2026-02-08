
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    category: string;
    description: string;
    price: string;
    image: string;
    icon: string;
    createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    price: String,
    image: String,
    icon: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
