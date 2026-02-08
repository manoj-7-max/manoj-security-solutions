const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: String,
    message: String,
    status: { type: String, default: 'New', enum: ['New', 'Pending', 'Resolved', 'Closed'] },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
