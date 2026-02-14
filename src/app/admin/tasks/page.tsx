
"use client";

import { useEffect, useState } from 'react';
import { Calendar, User, MapPin, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Booking {
    _id: string;
    serviceName: string;
    date: string;
    timeSlot: string;
    address: string;
    status: string;
    userId: string;
    notes?: string;
}

export default function StaffTasksPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/bookings')
            .then(res => res.json())
            .then(data => {
                setBookings(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    async function markCompleted(id: string) {
        if (!confirm("Are you sure you want to mark this job as completed?")) return;

        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Completed' })
            });

            if (res.ok) {
                setBookings(bookings.map(b => b._id === id ? { ...b, status: 'Completed' } : b));
                toast.success("Job marked as Completed!");
            } else {
                toast.error("Failed to update status");
            }
        } catch (e) {
            toast.error("Something went wrong");
        }
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Loading your tasks...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">My Assigned Jobs</h1>

            {bookings.length === 0 ? (
                <div className="bg-white p-10 rounded-xl shadow-sm border border-dashed border-gray-300 text-center">
                    <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No active jobs assigned to you.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">{booking.serviceName}</h3>
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase mt-1 ${booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-slate-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span>{booking.timeSlot || 'Flexible Time'}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                                    <span>{booking.address}</span>
                                </div>
                                {booking.notes && (
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-500 italic mt-2">
                                        "{booking.notes}"
                                    </div>
                                )}
                            </div>

                            {booking.status !== 'Completed' ? (
                                <button
                                    onClick={() => markCompleted(booking._id)}
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <CheckCircle className="w-4 h-4" /> Mark Completed
                                </button>
                            ) : (
                                <div className="text-center text-green-600 font-bold py-2 bg-green-50 rounded-lg border border-green-100">
                                    Job Completed
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
