"use client";

import { useState } from "react";
import { CheckSquare, Plus, Clock, AlertTriangle, CheckCircle2, Phone, MapPin, X, Loader2 } from "lucide-react";

const SAMPLE_AMC = [
    { id: 1, client: "Raj Apartments, OMR", cameras: 8, start: "2025-01-01", end: "2026-01-01", status: "active", phone: "9876543210" },
    { id: 2, client: "Srinivasa Hospital", cameras: 16, start: "2025-03-01", end: "2026-03-01", status: "active", phone: "9865432100" },
    { id: 3, client: "Vels University", cameras: 32, start: "2024-06-01", end: "2025-06-01", status: "expiring", phone: "9944305980" },
    { id: 4, client: "Retail Hub, T.Nagar", cameras: 4, start: "2024-01-01", end: "2025-01-01", status: "expired", phone: "9898989898" },
];

export default function AMCTrackerPage() {
    const [addModal, setAddModal] = useState(false);
    const [form, setForm] = useState({ client: "", cameras: 4, phone: "", address: "", start: "", end: "" });
    const [submitting, setSubmitting] = useState(false);

    const stats = {
        active: SAMPLE_AMC.filter(a => a.status === "active").length,
        expiring: SAMPLE_AMC.filter(a => a.status === "expiring").length,
        expired: SAMPLE_AMC.filter(a => a.status === "expired").length,
    };

    const badge = (status: string) => {
        if (status === "active") return { label: "Active", style: { background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" } };
        if (status === "expiring") return { label: "Expiring Soon", style: { background: "rgba(234,179,8,0.1)", color: "#eab308", border: "1px solid rgba(234,179,8,0.2)" } };
        return { label: "Expired", style: { background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" } };
    };

    const daysLeft = (end: string) => {
        const diff = Math.ceil((new Date(end).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00d4ff" }} />
                        <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#00d4ff" }}>AMC Tracker</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Annual Maintenance Contracts</h2>
                    <p className="text-zinc-500 text-sm mt-1">Track renewals, expirations, and client AMC plans.</p>
                </div>
                <button onClick={() => setAddModal(true)} className="font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all" style={{ background: "linear-gradient(135deg,#d4af37,#f5e27d,#b8860b)", color: "#000" }}>
                    <Plus className="w-5 h-5" /> Add AMC
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5">
                {[
                    { label: "Active Contracts", val: stats.active, icon: CheckCircle2, color: "#22c55e" },
                    { label: "Expiring (30 days)", val: stats.expiring, icon: Clock, color: "#eab308" },
                    { label: "Expired / Lapsed", val: stats.expired, icon: AlertTriangle, color: "#ef4444" },
                ].map((s, i) => (
                    <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(8,15,26,0.6)", border: `1px solid ${s.color}20` }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: s.color + "15" }}>
                            <s.icon className="w-5 h-5" style={{ color: s.color }} />
                        </div>
                        <p className="text-zinc-500 text-sm">{s.label}</p>
                        <p className="text-3xl font-bold text-white">{s.val}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(0,212,255,0.1)" }}>
                <div className="p-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#00d4ff" }}>All Contracts</h3>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            {["Client", "Cameras", "Phone", "Expiry", "Days Left", "Status", "Action"].map(h => (
                                <th key={h} className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {SAMPLE_AMC.map(amc => {
                            const b = badge(amc.status);
                            const days = daysLeft(amc.end);
                            return (
                                <tr key={amc.id} className="hover:bg-white/5 transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                    <td className="px-5 py-4 font-medium text-white text-sm">{amc.client}</td>
                                    <td className="px-5 py-4 text-zinc-400 text-sm font-mono">{amc.cameras}</td>
                                    <td className="px-5 py-4 text-zinc-400 text-sm font-mono">{amc.phone}</td>
                                    <td className="px-5 py-4 text-zinc-400 text-sm">{new Date(amc.end).toLocaleDateString("en-IN")}</td>
                                    <td className="px-5 py-4 text-sm font-mono font-bold" style={{ color: days < 0 ? "#ef4444" : days < 30 ? "#eab308" : "#22c55e" }}>
                                        {days < 0 ? `${Math.abs(days)}d ago` : `${days}d`}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={b.style}>{b.label}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <a href={`https://wa.me/91${amc.phone}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors" style={{ background: "rgba(37,211,102,0.1)", color: "#25d366", border: "1px solid rgba(37,211,102,0.2)" }}>
                                            Remind
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Add Modal */}
            {addModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setAddModal(false)} />
                    <div className="relative z-10 w-full max-w-md rounded-2xl p-6 shadow-2xl" style={{ background: "#080f1a", border: "1px solid rgba(0,212,255,0.2)" }}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-xl font-bold text-white">New AMC Contract</h3>
                            <button onClick={() => setAddModal(false)}><X className="w-5 h-5 text-zinc-500 hover:text-white" /></button>
                        </div>
                        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setAddModal(false); }}>
                            {[
                                { label: "Client Name *", field: "client", type: "text" },
                                { label: "Phone *", field: "phone", type: "tel" },
                                { label: "Site Address", field: "address", type: "text" },
                                { label: "Number of Cameras", field: "cameras", type: "number" },
                                { label: "Contract Start", field: "start", type: "date" },
                                { label: "Contract End", field: "end", type: "date" },
                            ].map(f => (
                                <div key={f.field}>
                                    <label className="text-xs font-bold uppercase tracking-widest block mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>{f.label}</label>
                                    <input type={f.type} value={(form as any)[f.field]} onChange={e => setForm({ ...form, [f.field]: e.target.value })} className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                                </div>
                            ))}
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setAddModal(false)} className="px-4 py-2 rounded-xl text-zinc-400">Cancel</button>
                                <button type="submit" className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest" style={{ background: "linear-gradient(135deg,#d4af37,#f5e27d,#b8860b)", color: "#000" }}>
                                    Save Contract
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
