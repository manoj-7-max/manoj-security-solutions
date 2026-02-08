
import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
    name: string;
    email: string;
    phone?: string;
    message: string;
    service?: string;
    status: 'New' | 'Pending' | 'Resolved' | 'Closed';
    date: Date;
}

const InquirySchema = new Schema<IInquiry>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    message: { type: String, required: true },
    service: String,
    status: { type: String, enum: ['New', 'Pending', 'Resolved', 'Closed'], default: 'New' },
    date: { type: Date, default: Date.now }
});

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
