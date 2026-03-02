"use client";

import { useState, useEffect } from "react";
import { Search, UserCircle, Phone, MapPin, Calendar, FileText, Loader2, Plus, X } from "lucide-react";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<any | null>(null);

    // Add customer modal
    const [addModal, setAddModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", requirement: "" });
    const [formError, setFormError] = useState("");

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/leads");
            const data = await res.json();
            // Show all leads that are "won" (converted customers) plus all leads
            if (data.leads) setCustomers(data.leads);
        } catch (e) {
            console.error("Failed to fetch customers", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCustomers(); }, []);

    const handleAddCustomer = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setFormError("");
        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, status: "new" }),
            });
            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.error || "Failed to add customer");
            }
            setAddModal(false);
            setForm({ name: "", phone: "", email: "", address: "", requirement: "" });
            fetchCustomers();
        } catch (err: any) {
            setFormError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const filtered = customers.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.phone?.includes(search) ||
        c.email?.toLowerCase().includes(search.toLowerCase())
    );

    const statusColor: Record<string, string> = {
        new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        site_visit: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        quote: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        won: "bg-green-500/10 text-green-400 border-green-500/20",
        lost: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    const statusLabel: Record<string, string> = {
        new: "New Lead", site_visit: "Site Visit", quote: "Quote Sent", won: "Customer ✓", lost: "Lost"
    };

    return (
        <div className="space-y-8 max-w-7xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-medium text-white mb-2">Customer Directory</h2>
                    <p className="text-zinc-500 font-light text-sm tracking-wider">All leads and clients in your pipeline.</p>
                </div>
                <button
                    onClick={() => setAddModal(true)}
                    className="bg-[#d4af37] text-black font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                    <Plus className="w-5 h-5" /> Add Customer
                </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(statusLabel).map(([key, label]) => (
                    <div key={key} className="bg-[#111] rounded-xl p-4 border border-white/5 text-center">
                        <p className="text-2xl font-display font-medium text-white">{customers.filter(c => c.status === key).length}</p>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mt-1">{label}</p>
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name, phone, email..."
                        className="w-full pl-11 pr-4 py-3 bg-[#111] border border-white/5 rounded-xl focus:border-[#d4af37]/50 focus:outline-none text-white text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {loading ? (
                    <div className="col-span-full text-center py-16 text-zinc-500 text-sm uppercase tracking-widest font-mono">
                        Loading directory...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="col-span-full text-center py-16 text-zinc-500 text-sm uppercase tracking-widest font-mono">
                        No customers found.
                    </div>
                ) : filtered.map(c => (
                    <div
                        key={c._id}
                        onClick={() => setSelected(c)}
                        className="bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-[#d4af37]/30 hover:bg-[#161616] transition-all cursor-pointer group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] font-bold text-sm">
                                    {c.name?.[0]?.toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-sm">{c.name}</h3>
                                    <p className="text-zinc-600 text-xs font-mono">{c.email || "No email"}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColor[c.status] || "bg-zinc-800/50 text-zinc-500 border-zinc-700"}`}>
                                {statusLabel[c.status] || c.status}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                <Phone className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                                <span className="font-mono tracking-wider">{c.phone}</span>
                            </div>
                            {c.address && (
                                <div className="flex items-start gap-2 text-xs text-zinc-400">
                                    <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                                    <span className="leading-snug">{c.address}</span>
                                </div>
                            )}
                            {c.requirement && (
                                <div className="flex items-start gap-2 text-xs text-zinc-500">
                                    <FileText className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                                    <span className="leading-snug">{c.requirement}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                            </div>
                            <span className="text-xs text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-widest">
                                View →
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Side Panel */}
            {selected && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
                    <div className="relative w-full max-w-md bg-[#0d0d0d] border-l border-white/10 h-full overflow-y-auto z-10 shadow-2xl">
                        <div className="p-6 border-b border-white/5 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] font-bold text-xl">
                                    {selected.name?.[0]?.toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-medium text-white">{selected.name}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColor[selected.status]}`}>
                                        {statusLabel[selected.status]}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => setSelected(null)} className="text-zinc-400 hover:text-white transition-colors mt-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Contact Details</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-[#d4af37]" />
                                        <span className="text-white font-mono">{selected.phone}</span>
                                    </div>
                                    {selected.email && (
                                        <div className="flex items-center gap-3">
                                            <UserCircle className="w-4 h-4 text-zinc-500" />
                                            <span className="text-zinc-300 text-sm">{selected.email}</span>
                                        </div>
                                    )}
                                    {selected.address && (
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-4 h-4 text-[#d4af37] mt-0.5" />
                                            <span className="text-zinc-300 text-sm leading-relaxed">{selected.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Requirement</p>
                                <p className="text-zinc-300 bg-[#111] rounded-xl p-4 text-sm leading-relaxed border border-white/5">
                                    {selected.requirement || "No requirement specified."}
                                </p>
                            </div>

                            {selected.visitDate && (
                                <div>
                                    <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Preferred Site Visit</p>
                                    <div className="flex items-center gap-3 bg-[#111] rounded-xl p-4 border border-white/5">
                                        <Calendar className="w-4 h-4 text-[#d4af37]" />
                                        <span className="text-zinc-300 text-sm">{new Date(selected.visitDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                                    </div>
                                </div>
                            )}

                            <div>
                                <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Timeline</p>
                                <p className="text-zinc-500 text-xs">Added: {new Date(selected.createdAt).toLocaleString()}</p>
                            </div>

                            <div className="pt-4 flex flex-col gap-3">
                                <a
                                    href={`https://wa.me/91${selected.phone?.replace(/\D/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 font-bold rounded-xl hover:bg-green-500/20 transition-colors text-sm uppercase tracking-widest"
                                >
                                    WhatsApp Client
                                </a>
                                <a
                                    href={`/admin/quotations/create`}
                                    className="w-full py-3 flex items-center justify-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] font-bold rounded-xl hover:bg-[#d4af37]/20 transition-colors text-sm uppercase tracking-widest"
                                >
                                    Generate Quotation
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Customer Modal */}
            {addModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setAddModal(false)} />
                    <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative z-10 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-display font-medium text-white">Add New Customer</h3>
                            <button onClick={() => setAddModal(false)} className="text-zinc-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleAddCustomer} className="space-y-4">
                            {formError && <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/50 text-red-400 text-sm">{formError}</div>}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Full Name *</label>
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Phone *</label>
                                    <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} type="tel" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none font-mono" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Email <span className="text-zinc-600">(Optional)</span></label>
                                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Site Address</label>
                                <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Requirement *</label>
                                <input required value={form.requirement} onChange={e => setForm({ ...form, requirement: e.target.value })} type="text" placeholder="E.g. 4-camera residential CCTV" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setAddModal(false)} className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white transition-colors">Cancel</button>
                                <button type="submit" disabled={submitting} className="bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50">
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Customer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
