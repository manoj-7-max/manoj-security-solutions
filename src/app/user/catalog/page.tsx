"use client";

import { useState, useEffect } from "react";
import { Camera, Search, Loader2, ShieldCheck, Mail } from "lucide-react";

export default function Catalog() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/products");
            const data = await res.json();
            if (data.products) setProducts(data.products);
        } catch (e) {
            console.error("Failed to load products", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-medium text-white mb-2">Hardware & Services</h2>
                    <p className="text-zinc-500 font-light text-sm tracking-wider">Browse our premium security technology catalog.</p>
                </div>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-2xl p-4 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input type="text" placeholder="Search catalog..." className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl focus:border-[#d4af37]/50 focus:outline-none text-white text-sm" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {loading ? (
                        <div className="col-span-full h-32 flex items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest">Loading Catalog...</div>
                    ) : products.length === 0 ? (
                        <div className="col-span-full h-32 flex items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest">No products found.</div>
                    ) : (
                        products.map((product) => (
                            <div key={product._id} className="bg-[#1a1a1a] p-5 rounded-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all group flex flex-col h-full">
                                <div className="w-full aspect-video bg-black/50 rounded-xl mb-4 flex items-center justify-center border border-white/5 group-hover:border-[#d4af37]/20 transition-colors overflow-hidden">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Camera className="w-8 h-8 text-zinc-800" />
                                    )}
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-2 py-0.5 rounded-full">{product.category}</span>
                                    {product.stock > 0 ? (
                                        <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded-full">In Stock</span>
                                    ) : (
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest bg-zinc-800 px-2 py-0.5 rounded-full">Inquire</span>
                                    )}
                                </div>
                                <h3 className="text-white font-medium text-sm leading-tight mb-4 flex-1">{product.name}</h3>

                                {/* PRICE SHOWN FOR CLIENTS AS PER NEW REQUEST */}
                                <div className="flex items-end justify-between border-t border-white/5 pt-3 mt-auto">
                                    <span className="text-xs text-zinc-500">Base Rate</span>
                                    <span className="text-lg font-mono font-bold text-[#d4af37]">₹{product.basePrice.toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div id="contact" className="bg-[#d4af37]/10 border border-[#d4af37]/20 p-8 rounded-2xl text-center">
                <h3 className="text-white font-display text-xl mb-2">Need a tailored security solution?</h3>
                <p className="text-zinc-400 text-sm mb-6 max-w-lg mx-auto">Different sites have different requirements. Contact our experts for an assessment and we will build a custom quotation based on the hardware shown above.</p>
                <div className="flex justify-center gap-4">
                    <a href="mailto:admin@manojsecuritysolutions.in" className="btn-gold font-bold px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)]">Email Support</a>
                    <a href="https://wa.me/919000000000" target="_blank" className="bg-[#111] text-white font-bold border border-white/10 hover:border-[#d4af37]/50 transition-colors px-6 py-3 rounded-xl">WhatsApp Us</a>
                </div>
            </div>
        </div>
    );
}
