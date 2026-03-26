"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle, TrendingUp, AlertTriangle, Briefcase, ArrowUpRight, Activity, Shield, Camera, Receipt } from "lucide-react";
import Link from "next/link";

const STATS = [
    { title: "Active CRM Leads", value: "32", change: "+4 this week", icon: Users, color: "#00d4ff", bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.15)" },
    { title: "Conversion Rate", value: "85%", change: "High success rate", icon: CheckCircle, color: "#d4af37", bg: "rgba(212,175,55,0.08)", border: "rgba(212,175,55,0.15)" },
    { title: "Est. Monthly Rev.", value: "₹4.5L", change: "+12% vs last month", icon: TrendingUp, color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.15)" },
    { title: "Expiring AMC", value: "5", change: "Requires action", icon: AlertTriangle, color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.15)" },
];

const QUICK_ACTIONS = [
    { label: "Generate Quotation", sub: "PDF + GST included", icon: FileText, href: "/admin/quotations/create", color: "#00d4ff" },
    { label: "Register Lead", sub: "Add to CRM pipeline", icon: Users, href: "/admin/crm", color: "#d4af37" },
    { label: "Create Invoice", sub: "Bill a customer", icon: Receipt, href: "/admin/invoices/create", color: "#22c55e" },
    { label: "Dispatch Job", sub: "Assign to technician", icon: Briefcase, href: "/admin/jobs", color: "#a855f7" },
];

const ACTIVITY_LOG = [
    { action: "Quotation QT-8041 generated for Vels University.", time: "10 mins ago", color: "#00d4ff" },
    { action: "New lead captured from website landing page.", time: "1 hr ago", color: "#d4af37" },
    { action: "AMC Reminder sent to KVCET via WhatsApp.", time: "3 hrs ago", color: "#22c55e" },
    { action: "Project 'Skyline Apartments' closed as WON.", time: "1 day ago", color: "#d4af37" },
    { action: "Invoice INV-203 paid via UPI — ₹18,500.", time: "1 day ago", color: "#22c55e" },
    { action: "Job dispatched to Tech Ravi — ECR Villa 8-cam.", time: "2 days ago", color: "#a855f7" },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState(STATS);
    const [recentActivities, setRecentActivities] = useState(ACTIVITY_LOG);

    useEffect(() => {
        async function loadDashboardData() {
            try {
                const res = await fetch("/api/leads");
                const data = await res.json();
                if (data.leads) {
                    setStats(prev => {
                        const newStats = [...prev];
                        newStats[0].value = data.leads.filter((l: any) => l.status !== "won" && l.status !== "lost").length.toString();
                        return newStats;
                    });
                    
                    const dynamicLogs = data.leads.slice(0, 4).map((l: any) => ({
                        action: `New enquiry: ${l.name} — ${l.requirement}`,
                        time: new Date(l.createdAt).toLocaleDateString(),
                        color: "#d4af37"
                    }));

                    setRecentActivities([...dynamicLogs, ...ACTIVITY_LOG].slice(0, 6));
                }
            } catch (e) {}
        }
        loadDashboardData();
    }, []);

    return (
        <div className="space-y-8 max-w-7xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">All Systems Operational</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Command Overview</h2>
                    <p className="text-zinc-500 text-sm mt-1">Real-time status of your security business operations.</p>
                </div>
                <div className="hidden md:flex items-center gap-3">
                    <div className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff" }}>
                        <Activity className="w-3.5 h-3.5 inline mr-1.5" />
                        Live Dashboard
                    </div>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
                        style={{ background: "rgba(8,15,26,0.6)", border: `1px solid rgba(255,255,255,0.06)` }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                                <s.icon className="w-5 h-5" style={{ color: s.color }} />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "rgba(255,255,255,0.25)" }}>{s.change}</span>
                        </div>
                        <p className="text-zinc-500 text-sm mb-1">{s.title}</p>
                        <h3 className="text-3xl font-bold text-white">{s.value}</h3>
                        <div className="mt-3 h-0.5 w-full rounded-full" style={{ background: `linear-gradient(90deg, ${s.color}40, transparent)` }} />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl p-6"
                    style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(0,212,255,0.1)" }}
                >
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#00d4ff" }}>
                        Quick Actions
                    </h4>
                    <ul className="space-y-3">
                        {QUICK_ACTIONS.map((a, i) => (
                            <li key={i}>
                                <Link
                                    href={a.href}
                                    className="flex items-center justify-between p-3 rounded-xl group transition-all"
                                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = a.color + "40"}
                                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: a.color + "15" }}>
                                            <a.icon className="w-4 h-4" style={{ color: a.color }} />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">{a.label}</p>
                                            <p className="text-zinc-600 text-xs">{a.sub}</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Activity log */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 rounded-2xl p-6 flex flex-col"
                    style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(212,175,55,0.1)" }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#d4af37" }}>
                            Recent Activity
                        </h4>
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>
                    <div className="flex-1 space-y-3 overflow-y-auto">
                        {recentActivities.map((log, i) => (
                            <div key={i} className="flex gap-4 items-start p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 animate-pulse" style={{ background: log.color }} />
                                <div>
                                    <p className="text-zinc-300 text-sm">{log.action}</p>
                                    <p className="text-zinc-600 text-xs mt-0.5 font-mono tracking-wider">{log.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Module links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { href: "/admin/crm", label: "CRM Pipeline", icon: Users, color: "#00d4ff" },
                    { href: "/admin/quotations", label: "Quotations", icon: FileText, color: "#d4af37" },
                    { href: "/admin/jobs", label: "Jobs & Installs", icon: Briefcase, color: "#a855f7" },
                    { href: "/admin/customers", label: "Customers", icon: Shield, color: "#22c55e" },
                ].map((m, i) => (
                    <Link key={i} href={m.href} className="flex flex-col items-center gap-3 p-5 rounded-2xl text-center group transition-all hover:-translate-y-1" style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = m.color + "30"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: m.color + "12" }}>
                            <m.icon className="w-6 h-6" style={{ color: m.color }} />
                        </div>
                        <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{m.label}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
