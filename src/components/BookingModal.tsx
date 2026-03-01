"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName?: string;
}

export default function BookingModal({ isOpen, onClose, planName = "Custom Security Package" }: BookingModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        visitDate: "",
        requirement: planName,
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");
        setErrorMessage("");

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit request.");
            }

            setStatus("success");
            setFormData({ name: "", phone: "", email: "", address: "", visitDate: "", requirement: planName });

            // Auto close after 3 seconds on success
            setTimeout(() => {
                onClose();
                setStatus("idle");
            }, 3000);

        } catch (err: any) {
            console.error(err);
            setStatus("error");
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden relative z-10 shadow-[0_0_50px_rgba(212,175,55,0.15)]"
                    >
                        {/* Header */}
                        <div className="bg-[#111] p-6 border-b border-white/5 flex items-center justify-between relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl translate-x-1/2 -translate-y-1/2" />
                            <div>
                                <h3 className="text-2xl font-display text-white font-medium flex items-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
                                    Secure Checkout
                                </h3>
                                <p className="text-zinc-500 text-sm mt-1">Acquiring: <span className="text-[#d4af37] font-semibold">{planName}</span></p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-10"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {status === "success" ? (
                                <div className="py-12 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                                        <ShieldCheck className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h4 className="text-2xl font-display font-medium text-white mb-2">Request Confirmed.</h4>
                                    <p className="text-zinc-400 font-light">Our engineering team has been notified. We will contact you shortly to confirm the site visit details.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {status === "error" && (
                                        <div className="p-3 bg-red-950/30 border border-red-500/30 text-red-400 text-sm rounded-xl">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Entity / Name *</label>
                                            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Phone *</label>
                                            <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50" />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Email <span className="text-zinc-700">(Optional)</span></label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50" />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Site Address *</label>
                                        <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37]/50" />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Preferred Site Visit Date <span className="text-zinc-700">(Optional)</span></label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                            <input type="date" name="visitDate" value={formData.visitDate} onChange={handleChange} className="w-full bg-[#111] border border-white/5 rounded-xl pl-11 pr-4 py-3 text-zinc-300 focus:outline-none focus:border-[#d4af37]/50 [color-scheme:dark]" />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full btn-gold py-4 mt-6 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Lock className="w-4 h-4" /> Confirm Request</>}
                                    </button>
                                    <p className="text-center text-[10px] uppercase font-bold tracking-widest text-zinc-600 mt-4">
                                        Encrypted & Secure Transmission
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
