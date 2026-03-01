import mongoose, { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
    {
        title: { type: String, required: true },
        customerName: { type: String, required: true },
        customerPhone: { type: String, required: true },
        address: { type: String, required: true },
        assignedTo: { type: Schema.Types.ObjectId, ref: "User" }, // Technician ID
        status: { type: String, enum: ["pending", "in_progress", "completed", "cancelled"], default: "pending" },
        photos: [{ type: String }], // Optional before/after proofs
        notes: { type: String },
        signature: { type: String }, // Optional base64 signature
        location: {
            lat: { type: Number },
            lng: { type: Number },
        },
    },
    { timestamps: true }
);

const Job = models?.Job || model("Job", JobSchema);
export default Job;
