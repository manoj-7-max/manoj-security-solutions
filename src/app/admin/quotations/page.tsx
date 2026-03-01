"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, FileText, Download, Share2, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

export default function QuotationsList() {
    const [quotes, setQuotes] = useState<any[]>([]);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const res = await fetch("/api/quotations");
                const data = await res.json();
                if (data.quotations) setQuotes(data.quotations);
            } catch (e) {
                console.error("Failed to fetch quotations", e);
            }
        };
        fetchQuotes();
    }, []);

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
                        <input type="text" placeholder="Search by Quote ID, Client Name..." className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/5 rounded-xl focus:border-[#d4af37]/50 focus:outline-none text-white text-sm" />
                    </div>
                    <select className="bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-[#d4af37]/50">
                        <option>All Statuses</option>
                        <option>Sent</option>
                        <option>Accepted</option>
                        <option>Draft</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/30 border-b border-white/5">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#d4af37]">Quote ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Client Name</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Date Issued</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Total Value</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {quotes.map((q, i) => (
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={q._id}
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-6 py-4 font-mono text-sm text-white"># {q.quoteNo}</td>
                                    <td className="px-6 py-4 font-medium text-sm text-zinc-300">{q.clientName}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-500">{new Date(q.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-mono font-bold text-sm text-green-400">₹{q.grandTotal.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${q.status === 'Sent' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                            q.status === 'Accepted' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                                            }`}>
                                            {q.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <button className="text-zinc-400 hover:text-white transition-colors" title="Download PDF"><Download className="w-4 h-4" /></button>
                                            <button className="text-zinc-400 hover:text-[#d4af37] transition-colors" title="Share via WhatsApp"><Share2 className="w-4 h-4" /></button>
                                            <button className="text-zinc-400 hover:text-white transition-colors" title="More Options"><MoreVertical className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
