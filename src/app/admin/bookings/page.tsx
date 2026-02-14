
"use client";

import { useEffect, useState } from 'react';
import { Calendar, User, CheckCircle, Clock, XCircle, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface Booking {
    _id: string;
    serviceName: string; // We stored this denormalized
    date: string;
    timeSlot: string;
    address: string;
    status: string;
    technicianId?: string;
    userId: string;
    notes?: string;
}

interface Staff {
    _id: string;
    name: string;
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [staff, setStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/bookings').then(res => res.json()),
            fetch('/api/admin/staff').then(res => res.json())
        ]).then(([bookingsData, staffData]) => {
            setBookings(Array.isArray(bookingsData) ? bookingsData : []);
            setStaff(Array.isArray(staffData) ? staffData : []);
            setLoading(false);
        });
    }, []);

    async function updateStatus(id: string, status: string) {
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
                toast.success(`Status updated to ${status}`);
            }
        } catch (e) {
            toast.error("Failed to update status");
        }
    }

    async function assignStaff(id: string, technicianId: string) {
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ technicianId, status: 'Confirmed' }) // Auto confirm on assignment
            });
            if (res.ok) {
                setBookings(bookings.map(b => b._id === id ? { ...b, technicianId, status: 'Confirmed' } : b));
                toast.success("Staff assigned & Booking Confirmed");
            }
        } catch (e) {
            toast.error("Failed to assign staff");
        }
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Loading bookings...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Booking Management</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold">Service</th>
                            <th className="p-4 font-semibold">Customer Details</th>
                            <th className="p-4 font-semibold">Date & Address</th>
                            <th className="p-4 font-semibold">Assigned Staff</th>
                            <th className="p-4 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 align-top">
                                    <span className="font-bold text-slate-800 block">{booking.serviceName}</span>
                                    {booking.notes && (
                                        <p className="text-xs text-slate-400 mt-1 italic max-w-[150px]">"{booking.notes}"</p>
                                    )}
                                </td>
                                <td className="p-4 align-top">
                                    {/* Note: In a real app we'd fetch/expand User details. For now assumes we rely on user link or populate */}
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-slate-400" />
                                        <span className="text-slate-600">UserID: {booking.userId.substring(0, 6)}...</span>
                                    </div>
                                </td>
                                <td className="p-4 align-top">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(booking.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                                            <Clock className="w-3 h-3" />
                                            {booking.timeSlot || 'Flexible'}
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">{booking.address}</p>
                                    </div>
                                </td>
                                <td className="p-4 align-top">
                                    <select
                                        className="bg-slate-100 border-none text-sm rounded-lg p-2 w-full focus:ring-2 focus:ring-primary"
                                        value={booking.technicianId || ""}
                                        onChange={(e) => assignStaff(booking._id, e.target.value)}
                                    >
                                        <option value="">Unassigned</option>
                                        {staff.map(s => (
                                            <option key={s._id} value={s._id}>{s.name}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-4 align-top">
                                    <div className="flex gap-2">
                                        {booking.status === 'Pending' && (
                                            <button onClick={() => updateStatus(booking._id, 'Cancelled')} className="p-1 hover:bg-red-50 text-red-500 rounded"><XCircle className="w-5 h-5" /></button>
                                        )}
                                        {booking.status === 'Confirmed' && (
                                            <button onClick={() => updateStatus(booking._id, 'Completed')} className="p-1 hover:bg-green-50 text-green-500 rounded"><CheckCircle className="w-5 h-5" /></button>
                                        )}

                                        <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                                                    booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {bookings.length === 0 && (
                    <div className="p-10 text-center text-slate-400">No bookings found.</div>
                )}
            </div>
        </div>
    );
}
