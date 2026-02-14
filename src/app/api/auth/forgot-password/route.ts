
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        await dbConnect();

        console.log(`[Forgot Password] Request for: ${email}`);

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`[Forgot Password] Email not found: ${email}`);
            return NextResponse.json({ error: "Email not found" }, { status: 404 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to DB
        user.resetOtp = otp;
        user.resetOtpExpires = Date.now() + 600000; // 10 mins
        await user.save();

        console.log(`[AUTH] Generated OTP for ${email}`);

        // --- EMAIL CONFIGURATION ---
        const smtpHost = process.env.SMTP_HOST || "smtp.resend.com";
        const smtpPort = parseInt(process.env.SMTP_PORT || "465");
        const smtpUser = process.env.SMTP_USER || "resend";
        const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

        // IMPORTANT: For Resend, 'From' must be 'onboarding@resend.dev' unless you have a verified domain.
        // We use EMAIL_FROM env var if set, otherwise default to onboarding for safety if using Resend.
        const isResend = smtpHost.includes("resend");
        const defaultFrom = isResend ? "onboarding@resend.dev" : "auth@manojsecurity.com";
        const emailFrom = process.env.EMAIL_FROM || defaultFrom;

        if (!smtpPass) {
            console.error("Missing SMTP_PASS or EMAIL_PASS environment variable");
            return NextResponse.json({
                error: "Server misconfiguration: Missing email credentials",
                details: "Please set SMTP_PASS in your environment variables."
            }, { status: 500 });
        }

        console.log(`[AUTH] Attempting to send email via ${smtpHost}:${smtpPort}`);
        console.log(`[AUTH] From: ${emailFrom}, User: ${smtpUser}`);

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for other ports
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        try {
            const info = await transporter.sendMail({
                from: `Manoj Security <${emailFrom}>`,
                to: email,
                subject: "Reset Your Password - Manoj Security Solutions",
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #2563eb;">Password Reset Request</h2>
                        <p>You requested to reset your password. Use the following OTP code:</p>
                        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #1e293b;">${otp}</span>
                        </div>
                        <p>This code will expire in 10 minutes.</p>
                        <p style="color: #666; font-size: 12px; margin-top: 30px;">If you didn't request this, please ignore this email.</p>
                    </div>
                `,
            });

            console.log(`[AUTH] Email sent successfully: ${info.messageId}`);
            return NextResponse.json({
                success: true,
                message: "OTP sent to your email.",
                // DEV MODE: Return OTP to frontend to unblock user if email fails
                debugOtp: otp
            });

        } catch (emailError: any) {
            console.error("Email Send Failed Details:", JSON.stringify(emailError, null, 2));

            // If it's a specific Resend error (like domain verification), tell the user
            let errorMessage = "Failed to send email.";
            if (emailError.message && emailError.message.includes("domain")) {
                errorMessage = "Email Server Error: Domain not verified. Please configure EMAIL_FROM correctly.";
            }

            return NextResponse.json({
                success: false,
                error: errorMessage,
                debugError: emailError.message,
                // Still return debug OTP in case of desperate need, but mark it as failure
                debugOtp: otp
            }, { status: 500 });
        }

    } catch (error: any) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
