import mongoose, { Schema, model, models } from "mongoose";

const QuotationSchema = new Schema(
    {
        quoteNo: { type: String, required: true, unique: true },
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
        status: { type: String, enum: ["Draft", "Finalized", "Sent", "Accepted", "Rejected"], default: "Finalized" },
        createdBy: { type: String } // User email or ID
    },
    { timestamps: true }
);

const Quotation = models?.Quotation || model("Quotation", QuotationSchema);
export default Quotation;
