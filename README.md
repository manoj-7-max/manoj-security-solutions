# Manoj Security Solutions

A modern, full-featured business website for security solutions with admin panel, e-commerce features, and user authentication.

## Features

### Public Website
- **Home Page**: Professional hero section with company overview
- **Products Page**: Browse security products with prices and cart functionality
- **Services Page**: Detailed service offerings
- **Contact Page**: Inquiry form with cart integration
- **Authentication**: User login/signup with Google OAuth support

### Admin Panel
- **Dashboard**: Real-time business statistics and recent inquiries
- **Product Management**: Add, edit, delete products with image uploads
- **Service Management**: Manage service offerings
- **Inquiry Management**: View and update customer inquiry status
- **Invoice Generator**: Create and print professional invoices

### Key Features
- 🛒 **Shopping Cart**: Add products to inquiry cart
- 👤 **User Authentication**: Email/password and Google sign-in
- 📊 **Dynamic Dashboard**: Real-time stats
- 📧 **Inquiry System**: Customer communication management
- 🧾 **Invoice Generation**: Professional invoice creation
- 📱 **Responsive Design**: Mobile-friendly interface
- 🎨 **Modern UI**: Dark theme with cyan accents

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Database**: JSON file-based storage
- **File Upload**: Multer
- **Authentication**: Google Identity Services
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Outfit)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/manoj-7-max/manoj-security-solutions.git
   cd manoj-security-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Access the website**
   - Open browser: `http://localhost:8000`
   - Admin panel: `http://localhost:8000/admin`
   - Admin credentials: `admin` / `admin123`

## Google OAuth Setup (Optional)

To enable Google Sign-In:

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project

2. **Enable Google+ API**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add redirect UR   - Add authorized origins: `http://localhost:8000`
Is: `http://localhost:8000/login.html`, `http://localhost:8000/signup.html`

4. **Update Client ID**
   - Copy your Client ID
   - Replace `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` in:
     - `login.html` (line 90)
     - `signup.html` (line 115)

## Project Structure

```
manoj-security-solutions/
├── admin/                  # Admin panel
│   ├── css/
│   ├── dashboard.html
│   ├── products.html
│   ├── services.html
│   ├── inquiries.html
│   └── invoice.html
├── css/                    # Stylesheets
│   └── styles.css
├── js/                     # JavaScript files
│   ├── script.js
│   ├── products.js
│   └── services.js
├── data/                   # JSON databases
│   ├── products.json
│   ├── services.json
│   ├── inquiries.json
│   └── users.json
├── uploads/                # Product images
├── index.html             # Home page
├── products.html          # Products page
├── services.html          # Services page
├── contact.html           # Contact page
├── login.html             # Login page
├── signup.html            # Signup page
├── server.js              # Express server
└── package.json
```

## API Endpoints

### Public APIs
- `GET /api/products` - Get all products
- `GET /api/services` - Get all services
- `POST /api/inquiries` - Submit inquiry

### Admin APIs
- `POST /api/products` - Add product
- `DELETE /api/products/:id` - Delete product
- `POST /api/services` - Add service
- `DELETE /api/services/:id` - Delete service
- `PUT /api/inquiries/:id` - Update inquiry status
- `GET /api/stats` - Get dashboard statistics

### Authentication APIs
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Features in Detail

### Cart System
Users can add products to an inquiry cart, which automatically fills the contact form with selected items.

### Invoice Generator
Admin can create invoices by:
1. Selecting a customer from inquiries
2. Adding products/services
3. Generating a printable invoice

### User Authentication
- Email/password registration and login
- Google Sign-In integration
- Persistent sessions using localStorage

## Security Notes

⚠️ **Important**: This is a demonstration project. For production:
- Implement password hashing (bcrypt)
- Use JWT tokens for session management
- Add HTTPS
- Implement CSRF protection
- Validate and sanitize all inputs
- Use a real database (MongoDB, PostgreSQL)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

- **Phone**: +91 99443 05980
- **Email**: Tamil Nadu, India
- **Website**: [Manoj Security Solutions](http://localhost:8000)

---

Built with ❤️ by the Manoj Security Solutions team
