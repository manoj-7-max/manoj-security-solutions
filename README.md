
# Manoj Security Solutions & Web Services

A full-stack Next.js application for a security solutions provider and web development agency.

## Features

### 🛒 E-commerce & Products
- **Product Catalog**: Browse CCTV cameras, biometric devices, and security accessories.
- **Stock Management**: Track inventory levels with real-time updates.
- **Point of Sale (POS)**: Admin interface for processing in-store sales and deducting stock.
- **Order History**: Customers can view their purchase history and invoices.

### 📅 Service Booking System
- **Service Listings**: Explore services like CCTV Installation, Web Development, and AMC.
- **Online Booking**: Customers can schedule appointments with date, time, and notes.
- **Staff Dashboard**: Staff members can view their assigned tasks and mark them as completed.
- **Admin Management**: Admins can assign technicians to bookings and manage service status.

### 🔐 Authentication & Security
- **Multi-method Login**: 
  - Email/Password (Credentials)
  - Google OAuth
  - Phone Number OTP (Firebase)
- **Role-based Access Control (RBAC)**:
  - **Admin**: Full access to dashboard, products, services, staff, and settings.
  - **Staff**: Access to assigned tasks and POS.
  - **User**: Access to profile, order history, and booking status.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with Mongoose
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) & [Firebase Auth](https://firebase.google.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Deployment**: [Render](https://render.com/)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname
NEXTAUTH_SECRET=<random-secret-key>
NEXTAUTH_URL=http://localhost:3000

# Firebase Configuration (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# ... other Firebase config
```

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/manoj-7-max/manoj-security-solutions.git
    cd manoj-security-solutions
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for deployment on Render. Ensure all environment variables are set in the Render dashboard.

## License

© 2024 Manoj Security Solutions. All rights reserved.
