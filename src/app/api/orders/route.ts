
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const invoiceNo = `INV-${Date.now()}`;

        const order = await Order.create({
            invoiceNo,
            customerName: body.customerName,
            phone: body.phone,
            items: body.items,
            totalAmount: body.totalAmount,
            paymentMethod: body.paymentMethod,
            status: 'Completed',
            date: new Date()
        });

        return NextResponse.json({ success: true, order });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
