
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    icon?: string;
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true },
    icon: String
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
