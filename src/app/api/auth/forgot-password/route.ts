
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const otpStore = new Map<string, { otp: string; expires: number }>();

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "Email not found" }, { status: 404 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(email, { otp, expires: Date.now() + 600000 }); // 10 mins

        // Configure Nodemailer (Use existing SMTP credentials from legacy)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER || process.env.EMAIL_USER,
                pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
            },
        });

        if (!process.env.SMTP_USER && !process.env.EMAIL_USER) {
            // Mock email if no config
            console.log(`[MOCK EMAIL] To: ${email}, OTP: ${otp}`);
            return NextResponse.json({ success: true, message: "Mock email sent (Check logs)" });
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER || "auth@manojsecurity.com",
            to: email,
            subject: "Password Reset OTP - Manoj Security Solutions",
            text: `Your OTP is: ${otp}`,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
