"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, Loader2, User } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Registration failed.");
                setLoading(false);
            } else {
                setSuccess(true);
                setTimeout(() => router.push("/login"), 2000);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md glass-card p-10 relative z-10 border border-white/10 rounded-3xl">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-black border border-white/10 mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                        <img src="/logo.png" alt="Manoj Security Solutions" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-3xl font-display font-medium text-white tracking-tight mb-2">Create Account</h1>
                    <p className="text-zinc-500 text-sm tracking-widest uppercase font-bold text-center">Client Services Portal</p>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-red-400 text-sm font-medium mb-6 text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-4 rounded-xl bg-green-950/30 border border-green-500/30 text-green-400 text-sm font-medium mb-6 text-center">
                        Account created! Redirecting to login...
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-[#111] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#111] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Secure Passcode</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-[#111] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full btn-gold py-4 flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : "Register"}
                    </button>

                    <div className="mt-4 text-center">
                        <Link href="/login" className="text-zinc-500 text-sm hover:text-[#d4af37] transition-colors">Already have an account? Sign in here.</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
