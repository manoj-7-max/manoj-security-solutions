"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, MoreVertical, Search, FileText, X, Loader2 } from "lucide-react";

const COLUMNS = [
    { id: "new", name: "New Lead", color: "text-blue-400", dot: "bg-blue-400" },
    { id: "site_visit", name: "Site Visit", color: "text-yellow-400", dot: "bg-yellow-400" },
    { id: "quote", name: "Quote Sent", color: "text-purple-400", dot: "bg-purple-400" },
    { id: "won", name: "Won / Closed", color: "text-green-400", dot: "bg-green-400" },
    { id: "lost", name: "Lost", color: "text-red-400", dot: "bg-red-400" },
];

export default function CRMLayout() {
    const [columns, setColumns] = useState<Record<string, any[]>>({
        new: [], site_visit: [], quote: [], won: [], lost: []
    });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", requirement: "", address: "", visitDate: "" });
    const [formError, setFormError] = useState("");

    // Drag state
    const dragItem = useRef<{ id: string; fromCol: string } | null>(null);

    const fetchLeads = async () => {
        try {
            const res = await fetch("/api/leads");
            const data = await res.json();
            const cols: Record<string, any[]> = { new: [], site_visit: [], quote: [], won: [], lost: [] };
            data.leads?.forEach((lead: any) => {
                const key = lead.status as string;
                if (cols[key]) {
                    cols[key].push({ id: lead._id, name: lead.name, req: lead.requirement, phone: lead.phone });
                }
            });
            setColumns(cols);
        } catch (err) {
            console.error("Failed to fetch leads", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLeads(); }, []);

    const handleDragStart = (id: string, fromCol: string) => {
        dragItem.current = { id, fromCol };
    };

    const handleDrop = async (toCol: string) => {
        if (!dragItem.current || dragItem.current.fromCol === toCol) return;
        const { id, fromCol } = dragItem.current;
        dragItem.current = null;

        setColumns(prev => {
            const fromItems = [...prev[fromCol]];
            const toItems = [...prev[toCol]];
            const idx = fromItems.findIndex(i => i.id === id);
            if (idx === -1) return prev;
            const [item] = fromItems.splice(idx, 1);
            toItems.unshift(item);
            return { ...prev, [fromCol]: fromItems, [toCol]: toItems };
        });

        try {
            await fetch(`/api/leads/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: toCol }),
            });
        } catch (e) { console.error("Update failed", e); }
    };

    const handleAddLead = async (e: React.FormEvent) => {
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
                throw new Error(d.error || "Failed to add lead");
            }
            setModalOpen(false);
            setForm({ name: "", phone: "", requirement: "", address: "", visitDate: "" });
            fetchLeads();
        } catch (err: any) {
            setFormError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredColumns = Object.fromEntries(
        Object.entries(columns).map(([key, items]) => [
            key,
            search ? items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.phone?.includes(search)) : items
        ])
    );

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-display font-medium">Sales Pipeline</h2>
                    <p className="text-zinc-500 text-sm mt-1">Drag cards between columns to update lead status.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search leads..."
                            className="pl-10 pr-4 py-2 bg-[#111] border border-white/10 rounded-xl focus:border-[#d4af37]/50 focus:outline-none text-white text-sm"
                        />
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-[#d4af37] text-black font-bold px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    >
                        <Plus className="w-5 h-5" /> New Lead
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-4">
                {loading ? (
                    <div className="flex items-center justify-center h-40 text-zinc-500 font-mono tracking-widest text-sm uppercase">
                        Loading Pipeline...
                    </div>
                ) : (
                    <div className="flex gap-5 min-w-max h-full">
                        {COLUMNS.map(col => (
                            <div
                                key={col.id}
                                className="flex flex-col w-[300px] shrink-0 bg-[#0a0a0a] border border-white/5 rounded-2xl"
                                onDragOver={e => e.preventDefault()}
                                onDrop={() => handleDrop(col.id)}
                            >
                                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#111] rounded-t-2xl">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                                        <h3 className={`font-bold text-sm tracking-wider uppercase ${col.color}`}>{col.name}</h3>
                                        <span className="bg-white/5 text-zinc-400 text-xs px-2 py-0.5 rounded-full font-bold">
                                            {filteredColumns[col.id]?.length || 0}
                                        </span>
                                    </div>
                                    <MoreVertical className="w-4 h-4 text-zinc-500 cursor-pointer" />
                                </div>

                                <div className="flex-1 p-3 flex flex-col gap-3 min-h-[200px] transition-colors">
                                    {filteredColumns[col.id]?.length === 0 && (
                                        <div className="flex-1 flex items-center justify-center text-zinc-700 text-xs uppercase font-bold tracking-widest border-2 border-dashed border-white/5 rounded-xl min-h-[100px]">
                                            Drop Here
                                        </div>
                                    )}
                                    {filteredColumns[col.id]?.map(item => (
                                        <div
                                            key={item.id}
                                            draggable
                                            onDragStart={() => handleDragStart(item.id, col.id)}
                                            className="p-4 rounded-xl border bg-[#151515] border-white/10 hover:border-[#d4af37]/40 hover:bg-[#1a1a1a] transition-all cursor-grab active:cursor-grabbing active:opacity-75 active:scale-95 select-none"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-white text-sm leading-tight">{item.name}</h4>
                                                <div className="text-[10px] text-zinc-500 px-2 py-0.5 rounded bg-white/5 border border-white/10 shrink-0 ml-2">B2B</div>
                                            </div>
                                            <p className="text-zinc-500 text-xs mb-4 leading-relaxed">{item.req}</p>
                                            <div className="flex justify-between items-center border-t border-white/5 pt-3">
                                                <p className="text-xs text-[#d4af37] font-mono tracking-wider">{item.phone}</p>
                                                <button className="text-zinc-600 hover:text-white transition-colors">
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Lead Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
                    <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative z-10 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-display font-medium text-white">Register New Lead</h3>
                            <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddLead} className="space-y-4">
                            {formError && (
                                <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/50 text-red-400 text-sm">{formError}</div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Client Name *</label>
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Phone *</label>
                                    <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} type="tel" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none font-mono" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Requirement *</label>
                                <input required value={form.requirement} onChange={e => setForm({ ...form, requirement: e.target.value })} type="text" placeholder="E.g. 8-Camera CCTV for warehouse" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Site Address</label>
                                <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} type="text" placeholder="Optional" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-zinc-400 font-medium hover:text-white transition-colors">Cancel</button>
                                <button type="submit" disabled={submitting} className="bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50">
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to Pipeline"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
