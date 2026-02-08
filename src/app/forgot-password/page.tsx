
"use client";

import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // In a real app, send API request here
        setSubmitted(true);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(135deg,#0b0c10_0%,#1f2833_100%)]">
            <div className="w-full max-w-[400px] bg-[#1f2833] p-10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

                <h2 className="text-[#66fcf1] text-center text-2xl font-bold mb-4">Reset Password</h2>
                <p className="text-[#c5c6c7] text-center mb-8 text-sm">Enter your email to receive reset instructions.</p>

                {submitted ? (
                    <div className="text-center">
                        <div className="bg-green-500/10 text-green-400 p-4 rounded mb-6 border border-green-500/20">
                            If an account exists for <b>{email}</b>, you will receive a reset link shortly.
                        </div>
                        <Link href="/login" className="btn-primary inline-block px-6 py-2">Back to Login</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block mb-2 text-[#c5c6c7] font-medium text-sm">Email Address</label>
                            <input
                                type="email" required
                                value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full p-3 bg-[#0b0c10] border border-[#45a29e] rounded-md text-white text-sm focus:outline-none focus:border-[#66fcf1]"
                            />
                        </div>

                        <button className="w-full py-3 bg-[#66fcf1] text-[#0b0c10] font-bold rounded hover:bg-[#45a29e] transition-colors flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" /> Send Reset Link
                        </button>
                    </form>
                )}

                {!submitted && (
                    <div className="text-center mt-6">
                        <Link href="/login" className="text-[#c5c6c7] text-sm hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
