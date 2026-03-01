import mongoose, { Schema, model, models } from "mongoose";

const LeadSchema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        address: { type: String },
        requirement: { type: String, required: true }, // E.g., package name or custom
        status: {
            type: String,
            enum: ["new", "site_visit", "quote", "won", "lost"],
            default: "new"
        },
        visitDate: { type: Date },
        notes: { type: String },
    },
    { timestamps: true }
);

const Lead = models?.Lead || model("Lead", LeadSchema);
export default Lead;
