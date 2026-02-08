const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    price: String, // Kept as string for 'TBD' support, or '4000'
    image: String,
    icon: String, // fallback if no image
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
