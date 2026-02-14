
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // 1. Validate Stock Levels
        for (const item of body.items) {
            // Skip manual items (they have id starting with 'manual-')
            if (item.productId && !item.productId.startsWith('manual-')) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 400 });
                }
                if (product.stock < item.quantity) {
                    return NextResponse.json({
                        error: `Insufficient stock for ${item.name}. Available: ${product.stock}, Requested: ${item.quantity}`
                    }, { status: 400 });
                }
            }
        }

        const invoiceNo = `INV-${Date.now()}`;
        let userId = null;
        let newPassword = null;

        // 2. User Handling (Find or Create)
        if (body.phone || body.email) {
            let user = await User.findOne({
                $or: [
                    { email: body.email },
                    { phone: body.phone }
                ]
            });

            if (!user) {
                // Generate simple password
                newPassword = Math.random().toString(36).slice(-8);
                const email = body.email || `user-${Date.now()}@manojsecurity.com`;

                try {
                    user = await User.create({
                        name: body.customerName,
                        email: email,
                        phone: body.phone,
                        password: newPassword, // Plain text for now
                        role: 'user',
                        authType: 'email' // Default
                    });
                } catch (e) {
                    // Handle unique constraint violation gracefully if race condition
                    console.error("User creation failed", e);
                    // Try finding again
                    user = await User.findOne({ $or: [{ email }, { phone: body.phone }] });
                }
            }
            if (user) userId = user._id;
        }

        // 3. Deduct Stock
        for (const item of body.items) {
            if (item.productId && !item.productId.startsWith('manual-')) {
                await Product.findByIdAndUpdate(item.productId, {
                    $inc: { stock: -item.quantity }
                });
            }
        }

        // 4. Create Order
        const order = await Order.create({
            invoiceNo,
            customerName: body.customerName,
            phone: body.phone,
            email: body.email,
            items: body.items,
            totalAmount: body.totalAmount,
            paymentMethod: body.paymentMethod,
            paymentStatus: 'Paid', // Assuming POS/Cash is paid immediately
            status: 'Completed',
            date: new Date(),
            userId: userId
        });

        return NextResponse.json({ success: true, order, newPassword, user: userId ? { id: userId, email: body.email } : null });
    } catch (error: any) {
        console.error("Order processing error:", error);
        return NextResponse.json({ error: error.message || "Failed to process order" }, { status: 500 });
    }
}

export async function GET() {
    await dbConnect();
    const orders = await Order.find().sort({ date: -1 });
    return NextResponse.json(orders);
}
