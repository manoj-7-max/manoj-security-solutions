"use client";

import { Save, Image as ImageIcon, Shield } from "lucide-react";

export default function CMSManager() {
    return (
        <div className="space-y-8 max-w-5xl">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00d4ff' }} />
                        <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#00d4ff' }}>Web Settings</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Platform Settings</h2>
                    <p className="text-zinc-500 text-sm mt-1">Control website content, SEO, and contact details.</p>
                </div>
                <button className="font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all" style={{ background: 'linear-gradient(135deg,#d4af37,#f5e27d,#b8860b)', color: '#000' }}>
                    <Save className="w-5 h-5" /> Save Changes
                </button>
            </div>

            <div className="p-8 rounded-2xl space-y-8" style={{ background: 'rgba(8,15,26,0.6)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <div>
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-4" style={{ color: '#00d4ff' }}>
                        <span className="w-6 h-[1px]" style={{ background: '#00d4ff' }} /> Core Identity
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 tracking-wider">Business Name</label>
                            <input type="text" defaultValue="Manoj Security Solutions" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-4 text-white focus:border-[#d4af37]/50 focus:outline-none transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 tracking-wider">Tagline</label>
                            <input type="text" defaultValue="Secure Your Assets. Digitize Your Future." className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-4 text-white focus:border-[#d4af37]/50 focus:outline-none transition-colors" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-semibold text-zinc-400 tracking-wider">SEO Description (Meta)</label>
                            <textarea rows={2} defaultValue="Precision security architecture for smart homes and enterprises." className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-4 text-white focus:border-[#d4af37]/50 focus:outline-none transition-colors resize-none"></textarea>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                    <h3 className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
                        <span className="w-6 h-[1px] bg-[#d4af37]" /> Hero Section
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 tracking-wider">Hero Headline (Use html for styling)</label>
                            <input type="text" defaultValue="Protecting <br/> <span className='gold-gradient-text italic font-serif'>The Elite.</span>" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-4 font-mono text-zinc-300 text-sm focus:border-[#d4af37]/50 focus:outline-none transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 tracking-wider">Hero Background Wallpaper</label>
                            <div className="flex gap-4">
                                <div className="w-32 h-20 bg-black border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                                    <Shield className="w-6 h-6 text-[#d4af37]" />
                                </div>
                                <div className="w-full bg-[#1A1A1A] border border-white/10 border-dashed rounded-lg flex flex-col items-center justify-center text-zinc-500 hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-colors cursor-pointer group">
                                    <ImageIcon className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs uppercase font-bold tracking-widest">Upload 4K Image (Max 5MB)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                    <h3 className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
                        <span className="w-6 h-[1px] bg-[#d4af37]" /> Communication Links
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 tracking-wider">WhatsApp Number</label>
                            <input type="text" defaultValue="+919944305980" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-4 font-mono text-zinc-300 text-sm focus:border-[#d4af37]/50 focus:outline-none transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-zinc-400 tracking-wider">Support Email</label>
                            <input type="email" defaultValue="support@manojsecuritysolutions.in" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-4 font-mono text-zinc-300 text-sm focus:border-[#d4af37]/50 focus:outline-none transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
