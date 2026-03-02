"use client";

import { CheckSquare, Phone, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const AMC_PLANS = [
    { name: "Basic AMC", price: "₹2,999 / yr", cameras: "Up to 4 Cameras", features: ["Annual service visit", "Remote diagnostics", "Priority support", "10% discount on repairs"], color: "#00d4ff" },
    { name: "Standard AMC", price: "₹5,999 / yr", cameras: "Up to 8 Cameras", features: ["2 service visits/year", "Same-day support", "Free minor repairs", "Camera realignment", "15% discount on hardware"], color: "#d4af37", highlight: true },
    { name: "Premium AMC", price: "₹11,999 / yr", cameras: "Up to 16 Cameras", features: ["Quarterly service visits", "24/7 on-call support", "All minor repairs free", "NVR health checks", "Free firmware updates", "20% discount on upgrades"], color: "#a855f7" },
];

export default function CustomerAMC() {
    return (
        <div className="max-w-5xl space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-1"><div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} /><span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#22c55e" }}>AMC Plans</span></div>
                <h2 className="text-3xl font-bold text-white">Annual Maintenance Contracts</h2>
                <p className="text-zinc-500 text-sm mt-1">Keep your security system running at peak performance, year-round.</p>
            </div>

            {/* What is AMC */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.15)" }}>
                <h3 className="font-bold text-white mb-2">What is an AMC?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">An Annual Maintenance Contract ensures your CCTV and security systems are regularly serviced, cameras stay clean and calibrated, DVR/NVR storage is optimized, and any faults are fixed fast — without surprise bills.</p>
            </div>

            {/* Plans */}
            <div className="grid md:grid-cols-3 gap-6">
                {AMC_PLANS.map((p, i) => (
                    <div key={i} className={`rounded-2xl p-6 flex flex-col relative transition-all ${p.highlight ? "scale-105" : ""}`}
                        style={{ background: p.highlight ? "rgba(8,20,40,0.9)" : "rgba(8,15,26,0.6)", border: `1px solid ${p.color}${p.highlight ? "50" : "20"}`, boxShadow: p.highlight ? `0 0 40px ${p.color}15` : "none" }}>
                        {p.highlight && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full" style={{ background: p.color, color: "#000" }}>Most Popular</div>
                        )}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: p.color + "15" }}>
                            <CheckSquare className="w-5 h-5" style={{ color: p.color }} />
                        </div>
                        <h3 className="font-bold text-white text-lg mb-1">{p.name}</h3>
                        <p className="text-zinc-500 text-xs mb-4">{p.cameras}</p>
                        <p className="text-2xl font-bold mb-6" style={{ color: p.color }}>{p.price}</p>
                        <ul className="space-y-2 flex-1">
                            {p.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: p.color }} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <a href="https://wa.me/919944305980" target="_blank" rel="noopener noreferrer" className="mt-6 block text-center py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all" style={{ background: p.color + "15", color: p.color, border: `1px solid ${p.color}30` }}>
                            Enquire Now <ArrowRight className="inline w-4 h-4 ml-1" />
                        </a>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5" style={{ background: "rgba(8,15,26,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div>
                    <p className="font-bold text-white text-lg">Not sure which plan is right for you?</p>
                    <p className="text-zinc-400 text-sm">Talk to our team — we&apos;ll recommend the perfect AMC based on your property and system.</p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <a href="tel:+919944305980" className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg,#d4af37,#b8860b)", color: "#000" }}>
                        <Phone className="w-4 h-4" /> Call Us
                    </a>
                    <a href="https://wa.me/919944305980" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm" style={{ background: "rgba(37,211,102,0.1)", color: "#25d366", border: "1px solid rgba(37,211,102,0.25)" }}>
                        <MessageSquare className="w-4 h-4" /> WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}
