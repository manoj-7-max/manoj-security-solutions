
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const { name, email, phone, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const user = await User.create({
            name,
            email,
            phone,
            password, // Plain text for now to match legacy. Ideally hash it.
            role: "user"
        });

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
