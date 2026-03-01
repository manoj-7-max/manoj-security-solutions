"use client";

import { motion } from "framer-motion";
import { Users, FileText, CheckCircle, TrendingUp, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { title: "Total active CRM leads", value: "32", change: "+4 this week", icon: Users, color: "text-[#d4af37]" },
        { title: "Quotations converted", value: "85%", change: "High success rate", icon: CheckCircle, color: "text-green-500" },
        { title: "Est. monthly Rev.", value: "₹4.5L", change: "+12% vs last month", icon: TrendingUp, color: "text-blue-500" },
        { title: "Expiring AMC", value: "5", change: "Requires action", icon: AlertTriangle, color: "text-red-500" },
    ];

    return (
        <div className="space-y-8">
            {/* High Level Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 ${s.color} group-hover:scale-110 transition-transform`}>
                                <s.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-bold">{s.change}</span>
                        </div>
                        <p className="text-zinc-500 text-sm font-medium mb-1">{s.title}</p>
                        <h3 className="text-3xl font-display font-medium text-white">{s.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-1 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[400px]"
                >
                    <h4 className="text-[#d4af37] text-xs tracking-widest uppercase font-bold mb-6">Execution Commands</h4>
                    <ul className="space-y-4">
                        <li>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-black/50 border border-white/5 hover:border-[#d4af37]/50 text-left transition-colors group">
                                <div>
                                    <p className="text-white font-medium text-sm">Create smart quote</p>
                                    <p className="text-zinc-500 text-xs mt-1">Generate PDF & GST details</p>
                                </div>
                                <FileText className="w-5 h-5 text-zinc-600 group-hover:text-[#d4af37]" />
                            </button>
                        </li>
                        <li>
                            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-black/50 border border-white/5 hover:border-[#d4af37]/50 text-left transition-colors group">
                                <div>
                                    <p className="text-white font-medium text-sm">Register new lead</p>
                                    <p className="text-zinc-500 text-xs mt-1">Assign to pipeline Kanban</p>
                                </div>
                                <Users className="w-5 h-5 text-zinc-600 group-hover:text-[#d4af37]" />
                            </button>
                        </li>
                    </ul>
                </motion.div>

                {/* Activity Logs (Placeholder for dynamic data) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col"
                >
                    <h4 className="text-[#d4af37] text-xs tracking-widest uppercase font-bold mb-6">Recent Server Activity</h4>
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {[
                            { action: "Quotation QT-8041 generated for Vels University.", time: "10 mins ago" },
                            { action: "New lead captured from Website Landing Page.", time: "1 hr ago" },
                            { action: "AMC Reminder sent to KVCET via WhatsApp AI.", time: "3 hrs ago" },
                            { action: "Project 'Skyline Apartments' closed as WON.", time: "1 day ago" },
                            { action: "Invoice INV-203 paid via UPI.", time: "1 day ago" },
                        ].map((log, i) => (
                            <div key={i} className="flex gap-4 items-start p-3 hover:bg-white/5 rounded-lg transition-colors">
                                <span className="w-2 h-2 mt-2 rounded-full bg-[#d4af37] shrink-0 animate-pulse" />
                                <div>
                                    <p className="text-zinc-300 text-sm">{log.action}</p>
                                    <p className="text-zinc-600 text-xs mt-1 font-mono tracking-wider">{log.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
