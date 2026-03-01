"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2, MapPin, Phone, User as UserIcon, CheckCircle2, Navigation } from "lucide-react";
import { useSession } from "next-auth/react";

export default function JobsDashboard() {
    const { data: session } = useSession();
    const userRole = (session?.user as any)?.role;
    const isTech = userRole === "technician";
    const canDispatch = userRole === "admin" || userRole === "staff";

    const [jobs, setJobs] = useState<any[]>([]);
    const [techs, setTechs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: "", customerName: "", customerPhone: "", address: "", notes: "", assignedTo: "" });
    const [submitting, setSubmitting] = useState(false);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/jobs");
            const data = await res.json();
            if (data.jobs) setJobs(data.jobs);

            if (canDispatch) {
                const uRes = await fetch("/api/users");
                const uData = await uRes.json();
                if (uData.users) {
                    setTechs(uData.users.filter((u: any) => u.role === "technician"));
                }
            }
        } catch (e) {
            console.error("Failed to load jobs", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [canDispatch]);

    const handleDispatchJob = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setModalOpen(false);
                setFormData({ title: "", customerName: "", customerPhone: "", address: "", notes: "", assignedTo: "" });
                fetchJobs();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-medium text-white mb-2">{isTech ? "My Dispatches" : "Field Operations"}</h2>
                    <p className="text-zinc-500 font-light text-sm tracking-wider">{isTech ? "View and update your assigned installations." : "Dispatch jobs to technicians."}</p>
                </div>
                {canDispatch && (
                    <button onClick={() => setModalOpen(true)} className="bg-[#d4af37] text-black font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        <Plus className="w-5 h-5" /> Dispatch Job
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full h-32 flex items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest">Loading Operations Data...</div>
                ) : jobs.length === 0 ? (
                    <div className="col-span-full h-32 flex items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest">No active jobs found.</div>
                ) : (
                    jobs.map((job) => (
                        <div key={job._id} className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all flex flex-col group relative overflow-hidden">
                            {job.status === "completed" && <div className="absolute top-0 right-0 w-12 h-12 bg-green-500/20 text-green-500 flex items-center justify-center rounded-bl-3xl"><CheckCircle2 className="w-5 h-5" /></div>}
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-white font-medium text-lg leading-tight w-[80%]">{job.title}</h3>
                            </div>

                            <div className="space-y-3 mb-6 flex-1">
                                <div className="flex items-start gap-3 text-sm text-zinc-400">
                                    <UserIcon className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />
                                    <span>{job.customerName}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-zinc-400">
                                    <Phone className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />
                                    <span className="font-mono tracking-wider">{job.customerPhone}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-zinc-400">
                                    <MapPin className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                                    <span className="leading-snug">{job.address}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                <div>
                                    <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Status</p>
                                    <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${job.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                            job.status === 'in_progress' ? 'bg-blue-500/10 text-blue-400' :
                                                job.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                                    'bg-zinc-800 text-zinc-400'
                                        }`}>
                                        {job.status.replace("_", " ")}
                                    </span>
                                </div>
                                {isTech && job.status !== "completed" ? (
                                    <button className="bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#d4af37] transition-all">
                                        <Navigation className="w-3 h-3" /> Update
                                    </button>
                                ) : (
                                    <div className="text-right">
                                        <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Tech</p>
                                        <p className="text-xs text-white truncate w-24">{job.assignedTo?.name || "Unassigned"}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {modalOpen && canDispatch && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
                    <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative z-10 shadow-2xl">
                        <h3 className="text-xl font-display font-medium text-white mb-6">Dispatch Field Operation</h3>
                        <form onSubmit={handleDispatchJob} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Job Title / Summary</label>
                                <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" placeholder="E.g. 4-Camera Setup at A1 Block" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Client Name</label>
                                    <input required value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Client Phone</label>
                                    <input required value={formData.customerPhone} onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })} type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none font-mono" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Site Location Address</label>
                                <textarea required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} rows={2} className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none resize-none"></textarea>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest ml-1">Assign Technician</label>
                                <select required value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-white focus:border-[#d4af37]/50 focus:outline-none">
                                    <option value="" disabled>Select Tech Personnel...</option>
                                    {techs.map(t => (
                                        <option key={t._id} value={t._id}>{t.name} (Tech)</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-8">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-zinc-400 font-medium hover:text-white transition-colors">Cancel</button>
                                <button type="submit" disabled={submitting} className="bg-[#d4af37] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50">
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Deploy Team"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
