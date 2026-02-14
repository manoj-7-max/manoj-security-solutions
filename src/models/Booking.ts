
import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    userId: string;
    serviceId: string;
    date: Date;
    address: string;
    notes: string;
    technicianId?: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    notes: String,
    technicianId: { type: Schema.Types.ObjectId, ref: 'User' }, // Staff
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
