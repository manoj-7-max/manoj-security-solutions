"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PackageCheck, Calendar, FileText, CheckSquare, ArrowRight, MapPin, Clock, CheckCircle2, Loader2, AlertCircle, Phone, MessageSquare } from "lucide-react";

const TRACK_STEPS = ["Order Received", "Technician Assigned", "Installation In Progress", "Completed"];

function TrackingTimeline({ status }: { status: string }) {
    const stepMap: Record<string, number> = { pending: 0, assigned: 1, in_progress: 2, completed: 3 };
    const current = stepMap[status] ?? 0;
    return (
        <div className="flex items-center gap-0 mt-4">
            {TRACK_STEPS.map((step, i) => (
                <div key={i} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${i <= current ? "border-[#00d4ff] text-[#00d4ff]" : "border-zinc-700 text-zinc-700"}`}
                            style={i <= current ? { background: "rgba(0,212,255,0.1)" } : {}}>
                            {i < current ? <CheckCircle2 className="w-4 h-4" style={{ color: "#22c55e" }} /> : i + 1}
                        </div>
                        <span className="text-[9px] text-zinc-500 mt-1 text-center w-16 leading-tight uppercase tracking-wide">{step}</span>
                    </div>
                    {i < TRACK_STEPS.length - 1 && (
                        <div className="flex-1 h-0.5 mx-1 mb-5 rounded" style={{ background: i < current ? "#00d4ff" : "rgba(255,255,255,0.08)" }} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default function UserDashboard() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/orders").then(r => r.json()).then(d => {
            if (d.orders) setOrders(d.orders);
            if (d.bookings) setOrders(prev => [...prev, ...d.bookings]);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const statusColor: Record<string, string> = {
        pending: "#eab308", assigned: "#00d4ff", in_progress: "#a855f7", completed: "#22c55e"
    };

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00d4ff" }} />
                    <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#00d4ff" }}>Customer Portal</span>
                </div>
                <h2 className="text-3xl font-bold text-white">My Service Dashboard</h2>
                <p className="text-zinc-500 text-sm mt-1">Track your installations, bookings, and security services.</p>
            </div>

            {/* Quick action cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: PackageCheck, label: "My Orders", sub: "Track installations", href: "#orders", color: "#00d4ff" },
                    { icon: Calendar, label: "Book Service", sub: "Schedule a visit", href: "/user/booking", color: "#d4af37" },
                    { icon: FileText, label: "Quotations", sub: "View proposals", href: "/user/quotations", color: "#a855f7" },
                    { icon: CheckSquare, label: "AMC Plans", sub: "Annual maintenance", href: "/user/amc", color: "#22c55e" },
                ].map((c, i) => (
                    <Link key={i} href={c.href} className="p-5 rounded-2xl flex flex-col gap-3 group hover:-translate-y-1 transition-all" style={{ background: "rgba(8,15,26,0.6)", border: `1px solid rgba(255,255,255,0.06)` }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = c.color + "30"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"}
                    >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.color + "12" }}>
                            <c.icon className="w-5 h-5" style={{ color: c.color }} />
                        </div>
                        <div>
                            <p className="font-bold text-white text-sm">{c.label}</p>
                            <p className="text-zinc-600 text-xs">{c.sub}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 mt-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.color }} />
                    </Link>
                ))}
            </div>

            {/* Support banner */}
            <div className="rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.06), rgba(212,175,55,0.04))", border: "1px solid rgba(0,212,255,0.15)" }}>
                <div>
                    <p className="font-bold text-white">Need help or have a question?</p>
                    <p className="text-zinc-400 text-sm">Our team is available Mon–Sat, 9AM–7PM. Call or WhatsApp anytime.</p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <a href="tel:+919944305980" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider" style={{ background: "linear-gradient(135deg,#d4af37,#b8860b)", color: "#000" }}>
                        <Phone className="w-4 h-4" /> Call Now
                    </a>
                    <a href="https://wa.me/919944305980" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider" style={{ background: "rgba(37,211,102,0.1)", color: "#25d366", border: "1px solid rgba(37,211,102,0.2)" }}>
                        <MessageSquare className="w-4 h-4" /> WhatsApp
                    </a>
                </div>
            </div>

            {/* Orders */}
            <div id="orders">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2" style={{ color: "#00d4ff" }}>
                    <PackageCheck className="w-4 h-4" /> My Active Installations & Jobs
                </h3>
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#00d4ff" }} />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="rounded-2xl p-12 flex flex-col items-center text-center" style={{ background: "rgba(8,15,26,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <AlertCircle className="w-10 h-10 text-zinc-700 mb-4" />
                        <p className="text-zinc-400 font-medium mb-1">No active installations yet.</p>
                        <p className="text-zinc-600 text-sm">Once our team dispatches a technician, your job will appear here with a live tracker.</p>
                        <Link href="/user/booking" className="mt-6 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest" style={{ background: "linear-gradient(135deg,#d4af37,#b8860b)", color: "#000" }}>
                            Book Your First Installation
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order: any) => (
                            <div key={order._id} className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "rgba(8,15,26,0.6)", border: "1px solid rgba(0,212,255,0.12)" }}>
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h4 className="font-bold text-white text-lg">{order.title || order.service || "Installation Job"}</h4>
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: (statusColor[order.status] || "#aaa") + "15", color: statusColor[order.status] || "#aaa", border: `1px solid ${statusColor[order.status] || "#aaa"}30` }}>
                                                {(order.status || "pending").replace("_", " ")}
                                            </span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm text-zinc-400 mb-2">
                                            <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#00d4ff" }} />
                                            <span>{order.address || "Address not specified"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>Created {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                                        </div>
                                    </div>
                                    {order.assignedTo && (
                                        <div className="shrink-0 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)" }}>
                                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Your Technician</p>
                                            <p className="font-bold text-white">{order.assignedTo?.name || "Assigned"}</p>
                                        </div>
                                    )}
                                </div>
                                <TrackingTimeline status={order.status || "pending"} />
                                {order.notes && (
                                    <div className="mt-4 p-3 rounded-xl text-xs text-zinc-400" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                        <span className="font-bold text-zinc-500 uppercase tracking-widest text-[9px] block mb-1">Latest Update</span>
                                        {order.notes}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
