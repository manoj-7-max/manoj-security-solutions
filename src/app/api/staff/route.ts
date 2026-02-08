
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // Check if user exists
        const exists = await User.findOne({ email: body.email });
        if (exists) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const user = await User.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            password: body.password || "staff123", // Default password
            role: "staff"
        });

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    await dbConnect();
    const staff = await User.find({ role: "staff" }).select("-password").sort({ name: 1 });
    return NextResponse.json(staff);
}
