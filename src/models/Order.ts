
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
}

export interface IOrder extends Document {
    invoiceNo: string;
    customerName: string;
    phone?: string;
    email?: string;
    address?: string;
    items: IOrderItem[];
    totalAmount: number;
    paymentMethod: 'Cash' | 'Card' | 'UPI' | 'Bank Transfer';
    status: 'Completed' | 'Pending' | 'Cancelled';
    date: Date;
}

const OrderSchema = new Schema<IOrder>({
    invoiceNo: { type: String, required: true },
    customerName: { type: String, required: true },
    phone: String,
    email: String,
    address: String,
    items: [{
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        total: Number
    }],
    totalAmount: Number,
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI', 'Bank Transfer'], default: 'Cash' },
    status: { type: String, default: 'Completed' },
    date: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
