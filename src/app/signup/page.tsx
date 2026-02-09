
"use client";

import { useState } from "react";
import { UserPlus, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({ name, email, phone, password }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();

            if (res.ok) {
                router.push("/login?signup=success");
            } else {
                setError(data.error || "Signup failed");
            }
        } catch (e) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-secondary/30">
            <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border border-border">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                        <UserPlus className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
                    <p className="text-muted-foreground mt-2">Join us today for secure solutions</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm flex items-center justify-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Full Name</label>
                        <input
                            type="text" required
                            value={name} onChange={e => setName(e.target.value)}
                            className="input-field"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Email Address</label>
                        <input
                            type="email" required
                            value={email} onChange={e => setEmail(e.target.value)}
                            className="input-field"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Phone Number</label>
                        <input
                            type="tel" required
                            value={phone} onChange={e => setPhone(e.target.value)}
                            className="input-field"
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required minLength={6}
                                value={password} onChange={e => setPassword(e.target.value)}
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
                        className="btn-primary w-full py-2.5 flex items-center justify-center gap-2 mt-4"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">
                        Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
