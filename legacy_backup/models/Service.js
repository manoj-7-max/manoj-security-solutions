const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, default: 'fa-solid fa-screwdriver-wrench' },
    description: String,
    features: [String], // Array of strings
    image: String // Optional image
});

module.exports = mongoose.model('Service', serviceSchema);
