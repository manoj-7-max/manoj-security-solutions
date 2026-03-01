import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true }, // E.g. Camera, DVR, Cable, Accessories
        basePrice: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        image: { type: String }, // URL or path
    },
    { timestamps: true }
);

const Product = models?.Product || model("Product", ProductSchema);
export default Product;
