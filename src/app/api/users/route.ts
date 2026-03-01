import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
    try {
        await dbConnect();

        // Security check - only admins can fetch all users
        const session = await getServerSession(authOptions);
        if ((session as any)?.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const users = await User.find().select("-password").sort({ createdAt: -1 });
        return NextResponse.json({ users }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch users", details: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();

        // Security check
        const session = await getServerSession(authOptions);
        if ((session as any)?.user?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password || !role) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user exists
        const exists = await User.findOne({ email });
        if (exists) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Hide password in response
        const userObj = newUser.toObject();
        delete userObj.password;

        return NextResponse.json({ message: "User created successfully", user: userObj }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to create user", details: error.message }, { status: 500 });
    }
}
