const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Service = require('./models/Service');
const Inquiry = require('./models/Inquiry');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/manoj_security')
    .then(() => console.log('✅ Connected to MongoDB for Seeding'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });

const seed = async () => {
    try {
        console.log('🌱 Seeding Database...');

        // 1. Staff User
        const staffEmail = 'staff@manojsecurity.com';
        let staff = await User.findOne({ email: staffEmail });
        if (!staff) {
            staff = new User({
                name: 'Staff Member 1',
                email: staffEmail,
                password: 'staff123', // Plain text as per current auth
                phone: '9876543210',
                role: 'staff',
                authType: 'email'
            });
            await staff.save();
            console.log('✅ Staff User Created: staff@manojsecurity.com');
        } else {
            console.log('ℹ️ Staff User already exists');
        }

        // 2. Products
        const products = [
            {
                name: '4MP IP Bullet Camera',
                category: 'CCTV',
                description: 'High-definition outdoor security camera with night vision.',
                price: '3500',
                icon: 'fa-video'
            },
            {
                name: 'Biometric Fingerprint Lock',
                category: 'Smart Lock',
                description: 'Advanced fingerprint and PIN access control for homes.',
                price: '8500',
                icon: 'fa-fingerprint'
            },
            {
                name: 'Video Door Phone',
                category: 'Intercom',
                description: 'See and speak to visitors from inside your home.',
                price: '6500',
                icon: 'fa-mobile-screen'
            },
            {
                name: 'Motion Sensor Alarm',
                category: 'Alarm',
                description: 'Detects unauthorized movement and triggers loud alarm.',
                price: '1200',
                icon: 'fa-bell'
            },
            {
                name: '8 Channel DVR',
                category: 'CCTV Accessories',
                description: 'Digital Video Recorder for up to 8 cameras.',
                price: '4500',
                icon: 'fa-hdd'
            }
        ];

        for (const p of products) {
            await Product.findOneAndUpdate({ name: p.name }, p, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${products.length} Products`);

        // 3. Services
        const services = [
            {
                name: 'CCTV Installation',
                description: 'Professional installation of security cameras for home and office.',
                icon: 'fa-video'
            },
            {
                name: 'Access Control Systems',
                description: 'Biometric and card-based entry systems for secure areas.',
                icon: 'fa-id-card'
            },
            {
                name: 'Maintenance & AMC',
                description: 'Annual maintenance contracts to keep your security systems running.',
                icon: 'fa-screwdriver-wrench'
            }
        ];

        for (const s of services) {
            await Service.findOneAndUpdate({ name: s.name }, s, { upsert: true, new: true });
        }
        console.log(`✅ Seeded ${services.length} Services`);

        console.log('✨ Seeding Completed Successfully');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding Error:', err);
        process.exit(1);
    }
};

seed();
