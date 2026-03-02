"use client";

import { useState } from "react";
import { CheckCircle2, Calendar, MapPin, Clock, ChevronRight, Loader2, Phone, MessageSquare, Camera, Lock, Fingerprint, Wrench, ScanLine } from "lucide-react";

const SERVICES = [
    { id: "cctv_install", icon: Camera, label: "CCTV Installation", desc: "Fresh installation of cameras, DVR/NVR, and cabling.", price: "From ₹4,999" },
    { id: "biometric", icon: Fingerprint, label: "Biometric Access", desc: "Fingerprint / face recognition door access systems.", price: "From ₹8,999" },
    { id: "smart_lock", icon: Lock, label: "Smart Door Lock", desc: "Digital lock installation with app and PIN control.", price: "From ₹3,499" },
    { id: "inspection", icon: ScanLine, label: "Free Site Inspection", desc: "Our engineer visits your site and gives a full security plan.", price: "Free" },
    { id: "repair", icon: Wrench, label: "Repair & Maintenance", desc: "Camera not working? We fix it — any brand.", price: "From ₹999" },
];

const TIME_SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

type BookingData = {
    service: string;
    date: string;
    time: string;
    address: string;
    notes: string;
    phone: string;
};

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [booking, setBooking] = useState<BookingData>({ service: "", date: "", time: "", address: "", notes: "", phone: "" });
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const selectedService = SERVICES.find(s => s.id === booking.service);

    // Min date = tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    const submit = async () => {
        setSubmitting(true);
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "Customer Booking",
                    phone: booking.phone,
                    requirement: `${selectedService?.label} | ${booking.date} ${booking.time}`,
                    address: booking.address,
                    notes: booking.notes,
                    status: "new",
                }),
            });
            setDone(true);
        } catch (e) { console.error(e); }
        finally { setSubmitting(false); }
    };

    if (done) {
        return (
            <div className="max-w-xl mx-auto text-center py-20">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)" }}>
                    <CheckCircle2 className="w-10 h-10" style={{ color: "#00d4ff" }} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Booking Confirmed!</h2>
                <p className="text-zinc-400 mb-8">We&apos;ve received your request for <strong className="text-white">{selectedService?.label}</strong> on <strong className="text-white">{booking.date}</strong> at <strong className="text-white">{booking.time}</strong>.</p>
                <div className="rounded-2xl p-6 mb-8 text-left" style={{ background: "rgba(8,15,26,0.8)", border: "1px solid rgba(0,212,255,0.15)" }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#00d4ff" }}>Booking Summary</p>
                    {[
                        { label: "Service", val: selectedService?.label },
                        { label: "Date", val: booking.date },
                        { label: "Time", val: booking.time },
                        { label: "Address", val: booking.address },
                        { label: "Phone", val: booking.phone },
                    ].map((r, i) => (
                        <div key={i} className="flex justify-between py-2 text-sm" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <span className="text-zinc-500">{r.label}</span>
                            <span className="text-white font-medium">{r.val}</span>
                        </div>
                    ))}
                </div>
                <p className="text-zinc-500 text-sm mb-6">Our team will call you within 2 hours to confirm your appointment slot.</p>
                <div className="flex gap-3 justify-center">
                    <a href="tel:+919944305980" className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg,#d4af37,#b8860b)", color: "#000" }}>
                        <Phone className="w-4 h-4" /> Call Us
                    </a>
                    <a href="https://wa.me/919944305980" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm" style={{ background: "rgba(37,211,102,0.1)", color: "#25d366", border: "1px solid rgba(37,211,102,0.25)" }}>
                        <MessageSquare className="w-4 h-4" /> WhatsApp Us
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#d4af37" }} />
                    <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#d4af37" }}>Installation Booking</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Book a Service Visit</h2>
                <p className="text-zinc-500 text-sm mt-1">Free site inspection available — no obligations.</p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3, 4].map(s => (
                    <div key={s} className="flex items-center gap-2 flex-1">
                        <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all`}
                                style={s <= step ? { background: "#00d4ff", color: "#000" } : { background: "rgba(255,255,255,0.05)", color: "#666", border: "1px solid rgba(255,255,255,0.1)" }}>
                                {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
                            </div>
                            <span className="text-xs text-zinc-500 hidden md:block">{["Service", "Date & Time", "Details", "Confirm"][s - 1]}</span>
                        </div>
                        {s < 4 && <div className="flex-1 h-0.5 rounded" style={{ background: s < step ? "#00d4ff" : "rgba(255,255,255,0.05)" }} />}
                    </div>
                ))}
            </div>

            <div className="rounded-2xl p-6" style={{ background: "rgba(8,15,26,0.7)", border: "1px solid rgba(0,212,255,0.12)" }}>
                {/* Step 1: Choose Service */}
                {step === 1 && (
                    <div>
                        <h3 className="font-bold text-white text-xl mb-5">Choose Your Service</h3>
                        <div className="space-y-3">
                            {SERVICES.map(s => (
                                <button key={s.id} onClick={() => { setBooking(b => ({ ...b, service: s.id })); }}
                                    className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                                    style={{
                                        background: booking.service === s.id ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.03)",
                                        border: booking.service === s.id ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.07)"
                                    }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,212,255,0.1)" }}>
                                        <s.icon className="w-5 h-5" style={{ color: "#00d4ff" }} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-white text-sm">{s.label}</p>
                                        <p className="text-zinc-500 text-xs mt-0.5">{s.desc}</p>
                                    </div>
                                    <span className="text-xs font-bold shrink-0" style={{ color: "#d4af37" }}>{s.price}</span>
                                </button>
                            ))}
                        </div>
                        <button disabled={!booking.service} onClick={() => setStep(2)} className="w-full mt-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-40" style={{ background: "linear-gradient(135deg,#00d4ff,#0090b3)", color: "#000" }}>
                            Continue <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                    <div>
                        <h3 className="font-bold text-white text-xl mb-5">Pick Your Slot</h3>
                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Preferred Date *</label>
                                <input type="date" min={minDate} value={booking.date} onChange={e => setBooking(b => ({ ...b, date: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Preferred Time *</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {TIME_SLOTS.map(t => (
                                        <button key={t} onClick={() => setBooking(b => ({ ...b, time: t }))}
                                            className="py-2.5 rounded-xl text-xs font-bold transition-all"
                                            style={booking.time === t ? { background: "rgba(0,212,255,0.15)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.4)" } : { background: "rgba(255,255,255,0.03)", color: "#666", border: "1px solid rgba(255,255,255,0.07)" }}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setStep(1)} className="px-5 py-3 rounded-xl text-zinc-400 font-medium hover:text-white transition-colors">Back</button>
                            <button disabled={!booking.date || !booking.time} onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-40" style={{ background: "linear-gradient(135deg,#00d4ff,#0090b3)", color: "#000" }}>
                                Continue <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                    <div>
                        <h3 className="font-bold text-white text-xl mb-5">Your Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Phone Number *</label>
                                <input type="tel" placeholder="+91 99443 05980" value={booking.phone} onChange={e => setBooking(b => ({ ...b, phone: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none font-mono" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Property Address *</label>
                                <textarea rows={3} placeholder="Full property address including flat number, building name, area, city..." value={booking.address} onChange={e => setBooking(b => ({ ...b, address: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none resize-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Special Requirements (optional)</label>
                                <textarea rows={2} placeholder="e.g. 4 cameras needed, existing DVR, prefer morning visit..." value={booking.notes} onChange={e => setBooking(b => ({ ...b, notes: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none resize-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setStep(2)} className="px-5 py-3 rounded-xl text-zinc-400 hover:text-white transition-colors">Back</button>
                            <button disabled={!booking.phone || !booking.address} onClick={() => setStep(4)} className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-40" style={{ background: "linear-gradient(135deg,#00d4ff,#0090b3)", color: "#000" }}>
                                Review Booking <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Confirm */}
                {step === 4 && (
                    <div>
                        <h3 className="font-bold text-white text-xl mb-5">Confirm Your Booking</h3>
                        <div className="rounded-xl p-5 mb-6 space-y-3" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }}>
                            {[
                                { icon: selectedService?.icon || Camera, label: "Service", val: selectedService?.label || "" },
                                { icon: Calendar, label: "Date", val: booking.date },
                                { icon: Clock, label: "Time", val: booking.time },
                                { icon: MapPin, label: "Address", val: booking.address },
                            ].map((r, i) => (
                                <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                                    <r.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#00d4ff" }} />
                                    <div>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{r.label}</p>
                                        <p className="text-white text-sm font-medium">{r.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-zinc-500 text-xs text-center mb-5">By confirming, you agree to allow our technician to visit your property at the scheduled time. We will call you before arrival.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setStep(3)} className="px-5 py-3 rounded-xl text-zinc-400 hover:text-white transition-colors">Back</button>
                            <button onClick={submit} disabled={submitting} className="flex-1 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50" style={{ background: "linear-gradient(135deg,#d4af37,#b8860b)", color: "#000" }}>
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Confirm Booking</>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
