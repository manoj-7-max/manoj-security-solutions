
"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            if (session.user.role === 'admin' || session.user.role === 'staff') {
                router.push("/admin/dashboard");
            } else {
                router.push("/");
            }
        }
    }, [status, session, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid email or password");
                setLoading(false);
            } else {
                router.refresh();
            }
        } catch (error) {
            setError("An error occurred");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-secondary/30">
            <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border border-border">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                    <p className="text-muted-foreground mt-2">Sign in to your account</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm flex items-center justify-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex justify-between">
                            Password
                            <Link href="/forgot-password" className="text-primary hover:underline text-xs">Forgot password?</Link>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field pr-10"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-2.5 flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">
                        Don't have an account? <Link href="/signup" className="text-primary font-semibold hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
