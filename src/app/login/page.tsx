"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Invalid credentials. Access denied.");
            setLoading(false);
        } else {
            // Fetch session to determine role
            try {
                const sessionRes = await fetch("/api/auth/session");
                const sessionData = await sessionRes.json();

                if (sessionData && sessionData.user) {
                    const role = sessionData.user.role;
                    if (role === 'user') {
                        router.push("/user/dashboard");
                    } else {
                        router.push("/admin");
                    }
                } else {
                    router.push("/");
                }
            } catch (err) {
                router.push("/admin"); // fallback
            }
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 blur-[150px] rounded-full point-events-none"></div>

            <div className="w-full max-w-md glass-card p-10 relative z-10 border border-white/10 rounded-3xl">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-black border border-white/10 mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                        <img src="/logo.png" alt="Manoj Security Solutions" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-3xl font-display font-medium text-white tracking-tight mb-2">Secure Gateway</h1>
                    <p className="text-zinc-500 text-sm tracking-widest uppercase font-bold text-center">Authorized Personnel Only</p>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-red-400 text-sm font-medium mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Identity</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#111] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                                placeholder="admin@manojsecuritysolutions.in"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Passcode</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-[#111] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-gold py-4 flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : "Authenticate"}
                    </button>

                    <div className="mt-4 text-center">
                        <Link href="/register" className="text-zinc-500 text-sm hover:text-[#d4af37] transition-colors">Need a client account? Register here.</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
