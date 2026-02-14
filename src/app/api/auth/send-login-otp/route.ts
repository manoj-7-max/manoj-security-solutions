
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to User (create temp user if needed or find existing)
        await dbConnect();
        let user = await User.findOne({ email });

        if (!user) {
            // Create a temporary user/record? Or just use a separate OTP collection?
            // For simplicity, we create a user with "pending" status or just update if exists.
            // If strictly login, maybe user must exist? 
            // Let's assume we allow sign-up via OTP.
            user = await User.create({
                name: "New User",
                email: email,
                role: 'user',
                authType: 'email-otp'
            });
        }

        user.resetOtp = otp;
        user.resetOtpExpires = Date.now() + 600000; // 10 mins
        await user.save();

        // --- EMAIL SENDING ---
        // Same logic as forgot-password
        const smtpHost = process.env.SMTP_HOST || "smtp.resend.com";
        const smtpPort = parseInt(process.env.SMTP_PORT || "465");
        const smtpUser = process.env.SMTP_USER || "resend";
        const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
        const emailFrom = process.env.EMAIL_FROM || "auth@manojsecurity.com";

        if (!smtpPass) {
            // Fallback for Demo/Dev Mode
            return NextResponse.json({
                success: true,
                message: "Dev Mode: OTP generated (Check console/response)",
                debugOtp: otp
            });
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
            from: `Manoj Security <${emailFrom}>`,
            to: email,
            subject: "Your Login OTP",
            html: `<div style="font-family:sans-serif; text-align:center;">
                <h2>Login Verification</h2>
                <p>Your OTP is:</p>
                <h1 style="letter-spacing:5px; background:#eee; padding:10px; display:inline-block;">${otp}</h1>
                <p>Valid for 10 minutes.</p>
            </div>`
        });

        return NextResponse.json({ success: true, message: "OTP sent" });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
