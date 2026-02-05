const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    id: { type: String, required: true }, // Keeping custom ID for now
    title: { type: String, required: true },
    icon: String,
    description: String,
    details: [String] // Array of bullet points
});

module.exports = mongoose.model('Service', serviceSchema);
