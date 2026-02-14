
"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch('/api/services') // In real app, fetch specific ID
            .then(res => res.json())
            .then(data => {
                const found = data.find((s: any) => s._id === id);
                setService(found);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serviceId: id,
                    serviceName: service?.name,
                    date,
                    time,
                    address,
                    notes
                })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Booking Request Sent!');
                router.push('/profile'); // Redirect to profile to see bookings
            } else {
                toast.error(data.error || 'Booking failed');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!service) return <div className="min-h-screen flex items-center justify-center">Service not found</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-primary p-8 text-white text-center">
                    <h1 className="text-3xl font-bold mb-2">Book Service</h1>
                    <p className="text-blue-100 opacity-90">Complete the details below to schedule your appointment.</p>
                </div>

                <div className="p-8 md:p-12">
                    <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100 flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Selected Service</p>
                            <h2 className="text-xl font-bold text-slate-800">{service.name}</h2>
                            <p className="text-primary font-bold">Est. Duration: {service.duration || 'Flexible'}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" /> Preferred Date
                                </label>
                                <input
                                    type="date" required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    value={date} onChange={e => setDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" /> Preferred Time
                                </label>
                                <select
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    value={time} onChange={e => setTime(e.target.value)}
                                >
                                    <option value="">Select Time Slot</option>
                                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                                    <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                                    <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" /> Service Address
                            </label>
                            <textarea
                                required placeholder="Enter full address with landmark..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 min-h-[100px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                value={address} onChange={e => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Additional Notes (Optional)</label>
                            <textarea
                                placeholder="Describe the issue or specific requirements..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 min-h-[80px] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                value={notes} onChange={e => setNotes(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Confirming Booking...' : 'Confirm Booking'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
