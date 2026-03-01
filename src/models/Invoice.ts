import mongoose, { Schema, model, models } from "mongoose";

const InvoiceSchema = new Schema(
    {
        invoiceNo: { type: String, required: true, unique: true },
        clientName: { type: String, required: true },
        clientPhone: { type: String },
        clientAddress: { type: String },
        items: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                rate: { type: Number, required: true },
                total: { type: Number, required: true }
            }
        ],
        subtotal: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        gst: { type: Number, default: 0 },
        grandTotal: { type: Number, required: true },
        status: { type: String, enum: ["Unpaid", "Paid", "Overdue", "Cancelled"], default: "Unpaid" },
        createdBy: { type: String } // User email or ID
    },
    { timestamps: true }
);

const Invoice = models?.Invoice || model("Invoice", InvoiceSchema);
export default Invoice;
