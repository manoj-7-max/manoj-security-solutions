"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, Printer, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function InvoicesList() {
    const [invoices, setInvoices] = useState<any[]>([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await fetch("/api/invoices");
                const data = await res.json();
                if (data.invoices) setInvoices(data.invoices);
            } catch (e) {
                console.error("Failed to fetch invoices", e);
            }
        };
        fetchInvoices();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-medium mb-2">Billing & Invoicing</h2>
                    <p className="text-zinc-500 font-light text-sm">Convert quotes to GST-compliant tax invoices.</p>
                </div>
                <Link href="/admin/invoices/create" className="bg-white text-black hover:bg-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all font-bold px-5 py-3 rounded-xl flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Generate Invoice
                </Link>
            </div>

            <div className="bg-[#111] overflow-hidden rounded-2xl border border-white/5">
                <div className="p-4 border-b border-white/5 flex gap-4 bg-[#151515]">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input type="text" placeholder="Search by Invoice #, Client..." className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/5 rounded-xl focus:border-[#d4af37]/50 focus:outline-none text-white text-sm" />
                    </div>
                    <select className="bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-400 focus:outline-none focus:border-[#d4af37]/50">
                        <option>All Statuses</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Partial</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black/30 border-b border-white/5">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#d4af37]">Invoice ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Client Name</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Date Issued</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Total Value</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Payment Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {invoices.map((inv, i) => (
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={inv._id}
                                    className="hover:bg-white/5 transition-colors group cursor-pointer"
                                >
                                    <td className="px-6 py-4 font-mono text-sm text-white"># {inv.invoiceNo}</td>
                                    <td className="px-6 py-4 font-medium text-sm text-zinc-300">{inv.clientName}</td>
                                    <td className="px-6 py-4 text-sm text-zinc-500">{new Date(inv.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-mono font-bold text-sm text-green-400">₹{inv.grandTotal.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] flex items-center gap-1.5 w-fit font-bold uppercase tracking-wider ${inv.status === 'Paid' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                            inv.status === 'Partial' || inv.status === 'Unpaid' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}>
                                            {inv.status === 'Paid' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-zinc-500 hover:text-[#d4af37] transition-colors p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-[#d4af37]/30" title="Print Tax Invoice">
                                            <Printer className="w-4 h-4" />
                                        </button>
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
