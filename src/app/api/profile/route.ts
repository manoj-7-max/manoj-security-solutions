
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { name, phone, currentPassword, newPassword } = data;

        await dbConnect();

        const user = await User.findOne({ email: session.user?.email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Update basic info
        if (name) user.name = name;
        if (phone) user.phone = phone;

        // Update password if provided
        if (newPassword) {
            if (!currentPassword) {
                return NextResponse.json({ message: "Current password is required to change password" }, { status: 400 });
            }

            // Verify current password (plain text as per current auth implementation)
            // TODO: Migrate to bcrypt
            if (user.password !== currentPassword) {
                return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
            }

            user.password = newPassword;
        }

        await user.save();

        return NextResponse.json({ message: "Profile updated successfully" });

    } catch (error) {
        console.error("Profile Update Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
