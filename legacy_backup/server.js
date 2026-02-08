require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Resend } = require('resend');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Import Models
const Product = require('./models/Product');
const Service = require('./models/Service');
const Inquiry = require('./models/Inquiry');
const User = require('./models/User');
const Order = require('./models/Order');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 8000;

// OTP Store (Temporary)
const otpStore = new Map();

// Email Transporter (Generic SMTP)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000
});

// Debug Log
console.log("Manoj Security Server Starting...");
console.log("SERVER VERSION: v1.5 (Fixed Email Check)"); // <--- Look for this in logs!
console.log("Environment Keys Available:", Object.keys(process.env).join(', '));
const emailKey = process.env.SMTP_USER || process.env.EMAIL_USER;
console.log("Email User Set:", emailKey ? "YES (Len: " + emailKey.length + ")" : "NO");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/manoj_security')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

// ========== API ROUTES ==========

// --- PRODUCTS ---
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            icon: req.body.icon,
            image: req.file ? 'uploads/' + req.file.filename : null
        });
        await newProduct.save();
        res.json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- SERVICES ---
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/services', upload.single('image'), async (req, res) => {
    try {
        let features = req.body.features;
        if (typeof features === 'string') {
            // Try parsing JSON, otherwise treat as single item or comma separated?
            // Let's assume JSON string from frontend or just array if multiple inputs
            try { features = JSON.parse(features); } catch (e) { features = [features]; }
        }

        const newService = new Service({
            name: req.body.name,
            description: req.body.description,
            icon: req.body.icon,
            features: features || [],
            image: req.file ? 'uploads/' + req.file.filename : null
        });
        await newService.save();
        res.json(newService);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/services/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- INQUIRIES ---
app.get('/api/inquiries', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ date: -1 });
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/inquiries', async (req, res) => {
    try {
        const newInquiry = new Inquiry({
            name: req.body.name,
            phone: req.body.phone,
            service: req.body.service,
            message: req.body.message
        });
        await newInquiry.save();
        res.json({ success: true, inquiry: newInquiry });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/inquiries/:id', async (req, res) => {
    try {
        await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/inquiries/:id', async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ORDERS (POS) ---
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const lastOrder = await Order.findOne().sort({ date: -1 });
        let nextInvoiceNo = 'INV-001';
        if (lastOrder && lastOrder.invoiceNo) {
            const num = parseInt(lastOrder.invoiceNo.split('-')[1]) + 1;
            nextInvoiceNo = 'INV-' + num.toString().padStart(3, '0');
        }

        const newOrder = new Order({
            invoiceNo: nextInvoiceNo,
            customerName: req.body.customerName || 'Walk-in Customer',
            phone: req.body.phone,
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            paymentMethod: req.body.paymentMethod
        });
        await newOrder.save();
        res.json({ success: true, order: newOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- DASHBOARD STATS ---
app.get('/api/stats', async (req, res) => {
    try {
        const inquiryCount = await Inquiry.countDocuments();
        const pendingCount = await Inquiry.countDocuments({ status: 'Pending' });
        const productCount = await Product.countDocuments();
        const serviceCount = await Service.countDocuments();

        res.json({
            inquiries: inquiryCount,
            pending: pendingCount,
            products: productCount,
            services: serviceCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- STAFF MANAGEMENT ---
app.get('/api/staff', async (req, res) => {
    try {
        const staff = await User.find({ role: 'staff' }).select('-password');
        res.json(staff);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/staff', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already registered' });

        const newUser = new User({
            name,
            email,
            phone,
            password,
            role: 'staff',
            authType: 'email'
        });
        await newUser.save();
        res.json({ success: true, message: 'Staff created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/staff/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- PASSWORD RESET ---
app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Check for either SMTP credentials OR Legacy Gmail credentials
    const hasCreds = (process.env.SMTP_USER && process.env.SMTP_PASS) ||
        (process.env.EMAIL_USER && process.env.EMAIL_PASS);

    if (!hasCreds) {
        return res.status(500).json({ error: 'Server Error: Email system not configured. Contact Admin.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'Email not found' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(email, { otp, expires: Date.now() + 600000 }); // 10 mins

        console.log("Preparing to send email to:", email);

        // Use Resend SDK if API Key starts with 're_' (Reliable HTTP)
        const apiKey = process.env.SMTP_PASS || process.env.EMAIL_PASS;
        if (apiKey && apiKey.startsWith('re_')) {
            console.log("Using Resend HTTP API...");
            const resend = new Resend(apiKey);
            const { error } = await resend.emails.send({
                from: process.env.EMAIL_USER || 'onboarding@resend.dev',
                to: email,
                subject: 'Password Reset OTP - Manoj Security Solutions',
                html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p><p>This OTP is valid for 10 minutes.<br>Do not share this with anyone.</p>`
            });
            if (error) throw new Error("Resend API Error: " + error.message);
        } else {
            // Fallback to Nodemailer SMTP
            console.log("Using SMTP Transporter...");
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset OTP - Manoj Security Solutions',
                text: `Your OTP for password reset is: ${otp}\n\nThis OTP is valid for 10 minutes.\nDo not share this with anyone.`
            });
        }
        console.log("Email sent successfully!");

        res.json({ success: true });
    } catch (err) {
        console.error("Email Error:", err);
        // Returns detailed error to Frontend for debugging
        res.status(500).json({ error: 'Email Failed: ' + err.message });
    }
});

app.post('/api/auth/reset-password', async (req, res) => {
    const { email, otp, password } = req.body;
    const stored = otpStore.get(email);

    if (!stored || stored.otp !== otp || stored.expires < Date.now()) {
        return res.status(400).json({ error: 'Invalid or Expired OTP' });
    }

    try {
        // Update Password (Plain-text as per current system)
        await User.findOneAndUpdate({ email }, { password });
        otpStore.delete(email);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- AUTHENTICATION ---
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already registered' });

        const newUser = new User({ name, email, phone, password, authType: 'email', role: 'user' });
        await newUser.save();

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.json({ success: true, user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        // password = password.trim(); // Don't trim password usually, but for simple hardcoded check maybe?

        // Hardcoded Admin Check (Updated)
        if (email === 'manojr9043@gmail.com' && password === 'Manoj@007') {
            const token = 'admin-token'; // In real app use JWT
            return res.json({
                success: true,
                user: { id: 'admin', name: 'Manoj', email: 'manojr9043@gmail.com', role: 'admin' }
            });
        }

        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.json({ success: true, user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/google', async (req, res) => {
    try {
        const { credential } = req.body;
        const base64Url = credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(Buffer.from(base64, 'base64').toString());

        let user = await User.findOne({ email: payload.email });
        if (!user) {
            user = new User({
                name: payload.name,
                email: payload.email,
                authType: 'google',
                googleId: payload.sub,
                picture: payload.picture
            });
            await user.save();
        }
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fallback for HTML Form
app.post('/contact.html', async (req, res) => {
    try {
        const newInquiry = new Inquiry({
            name: req.body.name,
            phone: req.body.phone,
            service: req.body.service,
            message: req.body.message
        });
        await newInquiry.save();
        res.redirect('/contact.html?status=success');
    } catch (err) {
        res.status(500).send("Error submitting form");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Using MongoDB`);
});
