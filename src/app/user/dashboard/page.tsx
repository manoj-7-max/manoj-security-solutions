"use client";

import { useState, useEffect } from "react";
import { Copy, Plus, MoreVertical, Loader2, Navigation, MapPin, Tag, PackageCheck, AlertCircle } from "lucide-react";

export default function UserDashboard() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMyData = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/orders");
            const data = await res.json();
            if (data.bookings) setBookings(data.bookings);
            if (data.orders) setOrders(data.orders);
        } catch (e) {
            console.error("Failed to load user data", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyData();
    }, []);

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-medium text-white mb-2">My Service Portal</h2>
                    <p className="text-zinc-500 font-light text-sm tracking-wider">Track your recent bookings, inquiries, and installations.</p>
                </div>
            </div>

            {loading ? (
                <div className="h-64 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Fetching Your Data...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Active Installations / Orders */}
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase font-bold tracking-widest text-[#d4af37] mb-4 flex items-center gap-2">
                            <PackageCheck className="w-4 h-4" /> Active Installations & Orders
                        </h3>
                        {orders.length === 0 ? (
                            <div className="bg-[#111] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center">
                                <AlertCircle className="w-10 h-10 text-zinc-600 mb-4" />
                                <p className="text-zinc-400 font-medium">No active installations found.</p>
                                <p className="text-zinc-600 text-xs mt-1">Once our team dispatches a technician, it will appear here.</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order._id} className="bg-[#111] p-6 rounded-2xl border border-[#d4af37]/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-bl-full pointer-events-none"></div>
                                    <h4 className="text-white font-medium text-lg leading-tight w-[80%] mb-3">{order.title}</h4>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-start gap-3 text-sm text-zinc-400">
                                            <MapPin className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                                            <span className="leading-snug">{order.address}</span>
                                        </div>
                                        {/* Status */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Status:</span>
                                            <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider ${order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                                    order.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                        order.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                            'bg-zinc-800 text-zinc-400'
                                                }`}>
                                                {order.status.replace("_", " ")}
                                            </span>
                                        </div>
                                    </div>
                                    {order.notes && (
                                        <div className="bg-black/50 border border-white/5 p-3 rounded-lg mt-4 text-xs text-zinc-400">
                                            <span className="font-bold text-zinc-500 uppercase tracking-widest text-[9px] block mb-1">Updates</span>
                                            {order.notes}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Bookings / Lead Requests */}
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                            <Tag className="w-4 h-4" /> My Consultation Requests
                        </h3>
                        {bookings.length === 0 ? (
                            <div className="bg-[#111] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center">
                                <p className="text-zinc-500 font-medium">You haven't requested any consultations yet.</p>
                            </div>
                        ) : (
                            bookings.map((booking) => (
                                <div key={booking._id} className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Service Requested</p>
                                            <h4 className="text-white font-medium text-sm">{booking.service}</h4>
                                        </div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest border ${booking.status === 'new' ? 'bg-zinc-800 text-white border-white/10' :
                                                booking.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    booking.status === 'quoted' ? 'bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30' :
                                                        booking.status === 'won' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                            'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="text-xs text-zinc-500 mb-2">
                                        <span className="font-mono text-zinc-400">Date:</span> {new Date(booking.createdAt).toLocaleDateString()}
                                    </div>
                                    {booking.message && (
                                        <p className="text-xs text-zinc-400 italic bg-black/30 p-2 rounded">
                                            "{booking.message}"
                                        </p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
