"use client";

import { useState } from "react";
import { FileText, Download, CheckCircle2, XCircle, Clock, Loader2, Send } from "lucide-react";

const SAMPLE_QUOTES = [
    { id: "QT-8041", date: "2026-02-20", service: "8-Camera CCTV — Office Complex", total: 34500, status: "pending" },
    { id: "QT-8039", date: "2026-02-10", service: "4-Camera Residential Package", total: 24999, status: "accepted" },
    { id: "QT-8031", date: "2026-01-15", service: "Biometric Access + Smart Lock", total: 18500, status: "rejected" },
];

export default function CustomerQuotations() {
    const [form, setForm] = useState({ requirement: "", address: "", phone: "" });
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Quote Request", phone: form.phone, requirement: form.requirement, address: form.address, status: "quote" }) });
            setDone(true);
        } catch (e) { console.error(e); }
        finally { setSubmitting(false); }
    };

    const statusStyle: Record<string, any> = {
        pending: { label: "Under Review", style: { background: "rgba(234,179,8,0.1)", color: "#eab308", border: "1px solid rgba(234,179,8,0.2)" } },
        accepted: { label: "Accepted", style: { background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" } },
        rejected: { label: "Rejected", style: { background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" } },
    };

    return (
        <div className="max-w-5xl space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-1"><div className="w-1.5 h-1.5 rounded-full" style={{ background: "#a855f7" }} /><span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#a855f7" }}>Quotations</span></div>
                <h2 className="text-3xl font-bold text-white">My Quotations</h2>
                <p className="text-zinc-500 text-sm mt-1">Request custom quotes and track their status.</p>
            </div>

            {/* Quote list */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="p-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#a855f7" }}>Your Quotations</p>
                </div>
                {SAMPLE_QUOTES.length === 0 ? (
                    <div className="p-12 text-center text-zinc-500 text-sm">No quotations yet. Request one below.</div>
                ) : (
                    <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                        {SAMPLE_QUOTES.map(q => {
                            const s = statusStyle[q.status];
                            return (
                                <div key={q.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 hover:bg-white/5 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(168,85,247,0.1)" }}>
                                            <FileText className="w-5 h-5" style={{ color: "#a855f7" }} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{q.service}</p>
                                            <p className="text-zinc-500 text-xs mt-0.5">Quote ID: <span className="font-mono text-zinc-400">{q.id}</span> · {new Date(q.date).toLocaleDateString("en-IN")}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 ml-14 md:ml-0">
                                        <div className="text-right">
                                            <p className="font-mono font-bold text-lg" style={{ background: "linear-gradient(135deg,#f5e27d,#d4af37,#b8860b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>₹{q.total.toLocaleString()}</p>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={s.style}>{s.label}</span>
                                        <button className="text-zinc-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Request new */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(168,85,247,0.15)" }}>
                <h3 className="font-bold text-white text-lg mb-5">Request a Custom Quotation</h3>
                {done ? (
                    <div className="py-8 text-center">
                        <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: "#22c55e" }} />
                        <p className="text-white font-bold">Quote Request Sent!</p>
                        <p className="text-zinc-400 text-sm mt-1">Our team will create a detailed quotation and send it to you within 24 hours.</p>
                    </div>
                ) : (
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>Your Requirement *</label>
                            <textarea required rows={3} value={form.requirement} onChange={e => setForm(f => ({ ...f, requirement: e.target.value }))} placeholder="Describe what you need — e.g. 8-camera CCTV for a 3000 sq ft office with 2 entry points..." className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none resize-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>Property Address *</label>
                                <input required type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Full site address" className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>Phone Number *</label>
                                <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 99443 05980" className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none font-mono" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                            </div>
                        </div>
                        <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50" style={{ background: "linear-gradient(135deg,#a855f7,#7c3aed)", color: "#fff" }}>
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Request Quotation</>}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
