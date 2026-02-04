const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/'))); // Serve static files from root for now

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Append extension
    }
});
const upload = multer({ storage: storage });

// Helper to read/write JSON
const DATA_DIR = path.join(__dirname, 'data');
const readData = (file) => {
    try {
        const data = fs.readFileSync(path.join(DATA_DIR, file));
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeData = (file, data) => {
    fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
};

// --- API Endpoints ---

// Products
app.get('/api/products', (req, res) => {
    res.json(readData('products.json'));
});

app.post('/api/products', upload.single('image'), (req, res) => {
    try {
        console.log('Received Add Product Request');
        console.log('Body:', req.body);
        console.log('File:', req.file);

        const products = readData('products.json');
        const newProduct = {
            id: Date.now(),
            name: req.body.name,
            category: req.body.category,
            price: req.body.price || "TBD",
            description: req.body.description,
            icon: req.body.icon || 'fa-solid fa-box',
            image: req.file ? `/uploads/${req.file.filename}` : null
        };
        products.push(newProduct);
        writeData('products.json', products);
        console.log('Product added successfully:', newProduct);
        res.json(newProduct);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', (req, res) => {
    let products = readData('products.json');
    products = products.filter(p => p.id != req.params.id);
    writeData('products.json', products);
    res.json({ success: true });
});

// Services
app.get('/api/services', (req, res) => {
    res.json(readData('services.json'));
});

app.post('/api/services', upload.single('image'), (req, res) => {
    const services = readData('services.json');
    const newService = {
        id: Date.now(),
        name: req.body.name,
        description: req.body.description,
        icon: req.body.icon || 'fa-solid fa-screwdriver-wrench',
        image: req.file ? `/uploads/${req.file.filename}` : null,
        features: req.body.features ? req.body.features.split(',') : []
    };
    services.push(newService);
    writeData('services.json', services);
    res.json(newService);
});

app.delete('/api/services/:id', (req, res) => {
    let services = readData('services.json');
    services = services.filter(s => s.id != req.params.id);
    writeData('services.json', services);
    res.json({ success: true });
});

// Inquiries
app.get('/api/inquiries', (req, res) => {
    res.json(readData('inquiries.json'));
});

app.post('/api/inquiries', (req, res) => {
    try {
        const inquiries = readData('inquiries.json');
        const newInquiry = {
            id: Date.now(),
            name: req.body.name,
            phone: req.body.phone,
            service: req.body.service,
            message: req.body.message,
            date: new Date().toISOString(),
            status: 'New'
        };
        inquiries.unshift(newInquiry); // Add to top
        writeData('inquiries.json', inquiries);
        res.json(newInquiry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/inquiries/:id', (req, res) => {
    try {
        let inquiries = readData('inquiries.json');
        const index = inquiries.findIndex(i => i.id == req.params.id);
        if (index !== -1) {
            inquiries[index].status = req.body.status;
            writeData('inquiries.json', inquiries);
            res.json({ success: true, inquiry: inquiries[index] });
        } else {
            res.status(404).json({ error: "Inquiry not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/inquiries/:id', (req, res) => {
    let inquiries = readData('inquiries.json');
    inquiries = inquiries.filter(i => i.id != req.params.id);
    writeData('inquiries.json', inquiries);
    res.json({ success: true });
});

// Stats
app.get('/api/stats', (req, res) => {
    try {
        const products = readData('products.json');
        const inquiries = readData('inquiries.json');
        const services = readData('services.json');

        const newInquiries = inquiries.filter(i => i.status === 'New').length; // Or just total length logic
        const pendingInquiries = inquiries.filter(i => i.status === 'Pending').length;

        res.json({
            products: products.length,
            services: services.length,
            inquiries: inquiries.length,
            newInquiries: newInquiries,
            pending: pendingInquiries
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Contact (Mock for now, could act as settings)
app.get('/api/contact', (req, res) => {
    // Return existing contact info or default
    const config = {
        phone: "+919944305980",
        email: "info@manojsecurity.com",
        address: "Tamil Nadu, India"
    };
    res.json(config);
});

// Fallback for form submission (HTML)
app.post('/contact.html', (req, res) => {
    try {
        const inquiries = readData('inquiries.json');
        const newInquiry = {
            id: Date.now(),
            name: req.body.name,
            phone: req.body.phone,
            service: req.body.service,
            message: req.body.message,
            date: new Date().toISOString(),
            status: 'New'
        };
        inquiries.unshift(newInquiry);
        writeData('inquiries.json', inquiries);

        // Redirect back with success param
        res.redirect('/contact.html?status=success');
    } catch (err) {
        res.status(500).send("Error submitting form");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
