"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Download, Share2, Briefcase, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function QuotationsList() {
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Convert to Job state
    const [convertModal, setConvertModal] = useState<any | null>(null);  // holds the quote being converted
    const [techs, setTechs] = useState<any[]>([]);
    const [assignedTo, setAssignedTo] = useState("");
    const [jobNotes, setJobNotes] = useState("");
    const [converting, setConverting] = useState(false);
    const [convertSuccess, setConvertSuccess] = useState(false);

    const fetchQuotes = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/quotations");
            const data = await res.json();
            if (data.quotations) setQuotes(data.quotations);
        } catch (e) {
            console.error("Failed to fetch quotations", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchTechs = async () => {
        try {
            const res = await fetch("/api/users");
            const data = await res.json();
            if (data.users) setTechs(data.users.filter((u: any) => u.role === "technician"));
        } catch (e) { console.error(e); }
    };

    useEffect(() => { fetchQuotes(); fetchTechs(); }, []);

    const handleMarkAccepted = async (quote: any) => {
        try {
            await fetch(`/api/quotations/${quote._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Accepted" }),
            });
            fetchQuotes();
        } catch (e) { console.error(e); }
    };

    const handleConvertToJob = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!convertModal) return;
        setConverting(true);
        try {
            const jobData = {
                title: `Installation – ${convertModal.clientName}`,
                customerName: convertModal.clientName,
                customerPhone: convertModal.clientPhone || "",
                address: convertModal.clientAddress || "Site address not specified",
                assignedTo: assignedTo || undefined,
                notes: jobNotes || `Converted from Quotation ${convertModal.quoteNo}. Items: ${convertModal.items?.map((i: any) => `${i.name} x${i.qty}`).join(", ")}`,
            };

            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData),
            });

            if (res.ok) {
                // Also mark quotation status as Accepted if not already
                await fetch(`/api/quotations/${convertModal._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "Accepted" }),
                });
                setConvertSuccess(true);
                setTimeout(() => {
                    setConvertModal(null);
                    setConvertSuccess(false);
                    setAssignedTo("");
                    setJobNotes("");
                    fetchQuotes();
                }, 2000);
            }
        } catch (e) { console.error(e); }
        finally { setConverting(false); }
    };

    const filtered = quotes.filter(q => {
        const matchesSearch = q.clientName?.toLowerCase().includes(search.toLowerCase()) || q.quoteNo?.includes(search);
        const matchesStatus = statusFilter === "All" || q.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statusBadge = (status: string) => {
        const map: Record<string, string> = {
            Sent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            Accepted: "bg-green-500/10 text-green-400 border-green-500/20",
            Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
            Draft: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
            Finalized: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        };
        return map[status] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-medium mb-2">Quotations Vault</h2>
                    <p className="text-zinc-500 font-light text-sm">Generate, track, and close security proposals.</p>
                </div>
                <Link href="/admin/quotations/create" className="bg-[#d4af37] text-black font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <Plus className="w-5 h-5" /> Generate Quote
                </Link>
            </div>

            <div className="bg-[#111] overflow-hidden rounded-2xl border border-white/5">
                <div className="p-4 border-b border-white/5 flex gap-4 bg-[#151515]">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by Quote ID, Client Name..."
                            className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/5 rounded-xl focus:border-[#d4af37]/50 focus:outline-none text-white text-sm"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-[#d4af37]/50"
                    >
                        <option>All</option>
                        <option>Finalized</option>
                        <option>Sent</option>
                        <option>Accepted</option>
                        <option>Rejected</option>
                        <option>Draft</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/30 border-b border-white/5">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#d4af37]">Quote ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Client Name</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Date</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Total</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={6} className="py-16 text-center text-zinc-500 text-sm uppercase tracking-widest font-mono">Loading...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6} className="py-16 text-center text-zinc-500 text-sm uppercase tracking-widest font-mono">No quotations found.</td></tr>
                            ) : filtered.map((q) => (
                                <tr key={q._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-sm text-white"># {q.quoteNo}</td>
                                    <td className="px-6 py-4 font-medium text-sm text-zinc-300">{q.clientName}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-500">{new Date(q.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-mono font-bold text-sm text-green-400">₹{q.grandTotal?.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadge(q.status)}`}>
                                            {q.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            {q.status !== "Accepted" && q.status !== "Rejected" && (
                                                <button
                                                    onClick={() => handleMarkAccepted(q)}
                                                    title="Mark as Accepted"
                                                    className="text-green-500 hover:text-green-300 transition-colors p-1.5 rounded-lg hover:bg-green-500/10"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setConvertModal(q)}
                                                title="Convert to Installation Job"
                                                className="text-[#d4af37] hover:text-yellow-300 transition-colors p-1.5 rounded-lg hover:bg-[#d4af37]/10"
                                            >
                                                <Briefcase className="w-4 h-4" />
                                            </button>
                                            <button className="text-zinc-400 hover:text-white transition-colors p-1.5" title="Download PDF">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button className="text-zinc-400 hover:text-[#d4af37] transition-colors p-1.5" title="Share via WhatsApp">
                                                <Share2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Convert to Job Modal */}
            {convertModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setConvertModal(null); setConvertSuccess(false); }} />
                    <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative z-10 shadow-[0_0_50px_rgba(212,175,55,0.15)]">

                        {convertSuccess ? (
                            <div className="py-12 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                </div>
                                <h3 className="text-2xl font-display font-medium text-white mb-2">Job Created!</h3>
                                <p className="text-zinc-400">The installation job has been dispatched. Head to <strong>Jobs / Installs</strong> to track progress.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                                        <Briefcase className="w-5 h-5 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-display font-medium text-white">Convert to Installation Job</h3>
                                        <p className="text-zinc-500 text-xs">Quotation <span className="text-[#d4af37] font-mono">#{convertModal.quoteNo}</span> → {convertModal.clientName}</p>
                                    </div>
                                </div>

                                <form onSubmit={handleConvertToJob} className="space-y-4">
                                    <div className="bg-[#111] rounded-xl p-4 border border-white/5 space-y-2 text-sm">
                                        <p className="text-zinc-500"><span className="text-zinc-300 font-medium">Client:</span> {convertModal.clientName}</p>
                                        <p className="text-zinc-500"><span className="text-zinc-300 font-medium">Phone:</span> {convertModal.clientPhone || "—"}</p>
                                        <p className="text-zinc-500"><span className="text-zinc-300 font-medium">Address:</span> {convertModal.clientAddress || "—"}</p>
                                        <p className="text-zinc-500"><span className="text-zinc-300 font-medium">Value:</span> <span className="text-green-400 font-mono font-bold">₹{convertModal.grandTotal?.toLocaleString()}</span></p>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Assign Technician <span className="text-zinc-600">(Optional)</span></label>
                                        <select
                                            value={assignedTo}
                                            onChange={e => setAssignedTo(e.target.value)}
                                            className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none"
                                        >
                                            <option value="">Unassigned — assign later</option>
                                            {techs.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Job Notes <span className="text-zinc-600">(Optional)</span></label>
                                        <textarea
                                            value={jobNotes}
                                            onChange={e => setJobNotes(e.target.value)}
                                            rows={3}
                                            placeholder="Special instructions, hardware details..."
                                            className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 mt-4">
                                        <button type="button" onClick={() => setConvertModal(null)} className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white transition-colors">Cancel</button>
                                        <button type="submit" disabled={converting} className="bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50">
                                            {converting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Briefcase className="w-3.5 h-3.5" /> Dispatch Job</>}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
