
import dbConnect from "@/lib/db";
import Inquiry from "@/models/Inquiry";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const inquiry = await Inquiry.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            message: body.message,
            service: body.service
        });

        return NextResponse.json({ success: true, inquiry });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    await dbConnect();
    const inquiries = await Inquiry.find().sort({ date: -1 });
    return NextResponse.json(inquiries);
}
