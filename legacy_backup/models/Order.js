const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
    status: { type: String, default: 'Completed' }, // Completed, Pending, Cancelled
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
