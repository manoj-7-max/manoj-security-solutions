"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
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

        const res = await signIn("credentials", { redirect: false, email, password });

        if (res?.error) {
            setError("Invalid credentials. Access denied.");
            setLoading(false);
        } else {
            try {
                const sessionRes = await fetch("/api/auth/session");
                const sessionData = await sessionRes.json();
                if (sessionData?.user?.role === "user") {
                    router.push("/user/dashboard");
                } else {
                    router.push("/admin");
                }
            } catch {
                router.push("/admin");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: "#020408" }}>
            {/* Grid bg */}
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
            {/* Glow blobs */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)" }} />
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />

            <div className="w-full max-w-md relative z-10">
                {/* Back link */}
                <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to website
                </Link>

                <div className="rounded-3xl p-8" style={{ background: "rgba(8,15,26,0.8)", border: "1px solid rgba(0,212,255,0.15)", backdropFilter: "blur(20px)", boxShadow: "0 0 60px rgba(0,212,255,0.05), 0 20px 60px rgba(0,0,0,0.5)" }}>
                    {/* Top header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative w-18 h-18 mb-5">
                            <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: "rgba(0,212,255,0.15)" }} />
                            <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.3)" }}>
                                <Shield className="w-8 h-8" style={{ color: "#00d4ff" }} />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Secure Gateway</h1>
                        <p className="text-xs uppercase tracking-[0.25em] font-bold" style={{ color: "#00d4ff" }}>Authorized Personnel Only</p>
                        <div className="mt-3 w-16 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }} />
                    </div>

                    {error && (
                        <div className="mb-5 p-3 rounded-xl text-sm text-center" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest block mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#00d4ff", opacity: 0.6 }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm focus:outline-none transition-all"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                                    onFocus={e => (e.target as HTMLElement).style.borderColor = "rgba(0,212,255,0.4)"}
                                    onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest block mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Passcode</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#00d4ff", opacity: 0.6 }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm focus:outline-none transition-all font-mono"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                                    onFocus={e => (e.target as HTMLElement).style.borderColor = "rgba(0,212,255,0.4)"}
                                    onBlur={e => (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all mt-2"
                            style={{ background: "linear-gradient(135deg, #d4af37, #f5e27d, #b8860b)", color: "#000", boxShadow: "0 0 25px rgba(212,175,55,0.3)" }}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Shield className="w-4 h-4" /> Authenticate</>}
                        </button>

                        <p className="text-center text-zinc-600 text-xs pt-2">
                            Need a client account?{" "}
                            <Link href="/register" className="transition-colors hover:text-white" style={{ color: "#00d4ff" }}>
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>

                <p className="text-center text-zinc-700 text-xs mt-6">
                    © {new Date().getFullYear()} Manoj Security Solutions
                </p>
            </div>
        </div>
    );
}
