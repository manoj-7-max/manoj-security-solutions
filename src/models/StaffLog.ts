
import mongoose, { Schema, Document } from 'mongoose';

export interface IStaffLog extends Document {
    staffId: string;
    action: string;
    details: string;
    images: string[];
    createdAt: Date;
}

const StaffLogSchema = new Schema<IStaffLog>({
    staffId: { type: mongoose.Schema.Types.ObjectId as any, ref: 'User', required: true },
    action: { type: String, required: true },
    details: String,
    images: [String]
}, { timestamps: true });

export default mongoose.models.StaffLog || mongoose.model<IStaffLog>('StaffLog', StaffLogSchema);
