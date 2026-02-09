
"use client";

import Link from 'next/link';
import { Package, Search, Filter, ShoppingCart, Star, Check, Zap, X } from 'lucide-react';
import { useState } from 'react';
import BackButton from '@/components/BackButton';

const products = [
    { id: 1, name: "CP PLUS 2.4MP Dome Camera", category: "CCTV", price: 1850, image: "/cctv-dome.png", rating: 4.5, features: ["Night Vision", "HD 1080p"] },
    { id: 2, name: "Hikvision 8 Channel DVR", category: "Recording", price: 4200, image: "/dvr.png", rating: 4.8, features: ["H.265+", "Mobile View"] },
    { id: 3, name: "Godrej Smart Bio Lock", category: "Smart Home", price: 14500, image: "/smart-lock.png", rating: 4.9, features: ["Fingerprint", "App Control"] },
    { id: 4, name: "Panasonic Video Door Phone", category: "Intercom", price: 9800, image: "/vdp-kit.png", rating: 4.6, features: ["7-inch Screen", "Night Mode"] },
    { id: 5, name: "Wireless Fire Alarm Sensor", category: "Sensors", price: 850, image: "/fire-sensor.png", rating: 4.2, features: ["Battery Operated", "Loud Siren"] },
    { id: 6, name: "eSSL Fingerprint Attendance", category: "Biometric", price: 6500, image: "/essl-bio.png", rating: 4.7, features: ["Excel Report", "USB Support"] },
    { id: 7, name: "Dahua 4MP IP Bullet Camera", category: "CCTV", price: 3200, image: "/ip-cam.png", rating: 4.8, features: ["PoE Support", "Weatherproof"] },
    { id: 8, name: "360° WiFi PTZ Camera", category: "Smart Home", price: 2100, image: "/wifi-ptz.png", rating: 4.4, features: ["2-Way Audio", "Motion Tracking"] },
    { id: 9, name: "Electronic Magnetic Lock", category: "Access Control", price: 2800, image: "/em-lock.png", rating: 4.3, features: ["600lbs Force", "LED Indicator"] },
    { id: 10, name: "Seagate SkyHawk 2TB HDD", category: "Storage", price: 5400, image: "/hdd.png", rating: 4.9, features: ["Surveillance Grade", "3yr Warranty"] },
    { id: 11, name: "4G SIM Router for CCTV", category: "Networking", price: 3800, image: "/4g-router.png", rating: 4.5, features: ["Plug & Play", "High Speed"] },
    { id: 12, name: "Intruder Alarm System Kit", category: "Security", price: 7500, image: "/alarm-kit.png", rating: 4.6, features: ["Door Sensor", "PIR Motion"] },
];

export default function ProductsPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Products");

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory || (selectedCategory === "CCTV Cameras" && product.category === "CCTV");
        // Simplified category logic for demo
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm/50">
                <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="w-full md:w-auto flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <BackButton />
                            <Link href="/" className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                    <Package className="w-5 h-5" />
                                </div>
                                <span className="hidden sm:inline">Manoj Store</span>
                            </Link>
                        </div>

                        {/* Mobile Cart / Filter Toggle */}
                        <div className="flex items-center gap-3 md:hidden">
                            <button onClick={() => setShowFilters(!showFilters)} className="p-2 border rounded-full text-slate-600 hover:bg-slate-100">
                                <Filter className="w-5 h-5" />
                            </button>
                            <button className="relative p-2 hover:bg-slate-100 rounded-full text-slate-600">
                                <ShoppingCart className="w-6 h-6" />
                                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[10px] font-bold text-white flex items-center justify-center">2</span>
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search cameras, locks, cables..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-slate-700 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[10px] font-bold text-white flex items-center justify-center">2</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters Sidebar - Desktop & Mobile Overlay */}
                    <aside className={`
                        fixed inset-0 z-40 bg-white p-6 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:w-64 lg:p-0 lg:bg-transparent lg:block
                        ${showFilters ? 'translate-x-0' : '-translate-x-full'}
                    `}>
                        <div className="bg-white lg:bg-transparent h-full overflow-y-auto lg:overflow-visible lg:h-auto">
                            <div className="flex justify-between items-center mb-6 lg:hidden">
                                <h3 className="font-bold text-lg text-slate-800">Filters</h3>
                                <button onClick={() => setShowFilters(false)} className="p-1 rounded-full hover:bg-slate-100">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="lg:bg-white lg:p-6 lg:rounded-2xl lg:border lg:border-gray-100 lg:shadow-sm lg:sticky lg:top-24">
                                <h3 className="font-bold text-lg mb-6 hidden lg:flex items-center gap-2 text-slate-800"><Filter className="w-5 h-5" /> Filters</h3>

                                <div className="space-y-8">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Category</label>
                                        <div className="space-y-2.5">
                                            {['All Products', 'CCTV Cameras', 'Smart Home', 'Access Control', 'Networking', 'Storage'].map((cat, i) => (
                                                <div
                                                    key={cat}
                                                    className="flex items-center gap-3 group cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedCategory(cat);
                                                        setShowFilters(false); // Close mobile menu on select
                                                    }}
                                                >
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedCategory === cat ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                                                        {selectedCategory === cat && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                    <span className={`text-sm ${selectedCategory === cat ? 'font-medium text-blue-600' : 'text-slate-600 group-hover:text-slate-900'}`}>{cat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Price Range</label>
                                        <input type="range" className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                        <div className="flex justify-between text-xs font-medium text-slate-500 mt-2">
                                            <span>₹500</span>
                                            <span>₹50,000+</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Brand</label>
                                        <div className="space-y-2">
                                            {['CP Plus', 'Hikvision', 'Dahua', 'Godrej', 'Seagate'].map((brand) => (
                                                <span key={brand} className="inline-block px-3 py-1 bg-slate-50 text-slate-600 text-xs rounded-full mr-2 mb-2 border border-slate-100 cursor-pointer hover:border-blue-200 hover:text-blue-600 transition-colors">
                                                    {brand}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Overlay for mobile when sidebar is open */}
                    {showFilters && (
                        <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setShowFilters(false)}></div>
                    )}

                    {/* Product Grid */}
                    <main className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100 gap-4">
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-slate-800">Security Essentials</h1>
                                <p className="text-slate-500 text-sm">Showing {filteredProducts.length} premium products</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:border-blue-300 w-full sm:w-auto justify-between sm:justify-start">
                                Sort by: <span>Popularity</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col relative">
                                    {/* Sale Badge */}
                                    {product.price > 10000 && (
                                        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold px-2 py-1 rounded shadow-sm z-10 uppercase tracking-wide">
                                            Best Seller
                                        </div>
                                    )}

                                    <div className="aspect-[4/3] bg-slate-50 p-6 flex items-center justify-center relative group-hover:bg-blue-50/30 transition-colors">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm p-4 sm:p-6 group-hover:scale-110 transition-transform duration-500">
                                            {/* Placeholder Image Logic */}
                                            <Package className="w-full h-full opacity-80" />
                                        </div>

                                        <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wide border border-slate-200">
                                                {product.category}
                                            </span>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded">
                                                <Star className="w-3 h-3 fill-current" /> {product.rating}
                                            </div>
                                        </div>

                                        <h3 className="font-bold text-slate-800 text-base sm:text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {product.features.slice(0, 2).map((feat, idx) => (
                                                <span key={idx} className="text-[11px] text-slate-500 flex items-center gap-1 bg-slate-50 px-1.5 rounded">
                                                    <Zap className="w-3 h-3 text-yellow-500" /> {feat}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-400 line-through">₹{(product.price * 1.2).toFixed(0)}</span>
                                                <span className="text-lg sm:text-xl font-extrabold text-slate-900">₹{product.price.toLocaleString()}</span>
                                            </div>
                                            <button className="px-3 py-2 sm:px-4 bg-slate-900 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors shadow-lg shadow-slate-200 hover:shadow-blue-200">
                                                Buy Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
