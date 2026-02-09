
import Link from 'next/link';
import { Package, Search, Filter, ShoppingCart } from 'lucide-react';

const products = [
    { id: 1, name: "4MP IP Dome Camera", category: "CCTV", price: 2800, image: "/cctv.png" },
    { id: 2, name: "8 Channel NVR 4K", category: "CCTV", price: 6500, image: "/nvr.png" },
    { id: 3, name: "Biometric Glass Door Lock", category: "Access Control", price: 12500, image: "/lock.png" },
    { id: 4, name: "Video Door Phone Kit", category: "Intercom", price: 8500, image: "/vdp.png" },
    { id: 5, name: "Wireless Fire Alarm", category: "Safety", price: 4200, image: "/fire.png" },
    { id: 6, name: "RFID Attendance System", category: "Access Control", price: 5500, image: "/rfid.png" },
    { id: 7, name: "2MP Bullet Camera", category: "CCTV", price: 1800, image: "/bullet.png" },
    { id: 8, name: "Smart Wifi Camera", category: "CCTV", price: 2200, image: "/wifi-cam.png" },
];

export const metadata = {
    title: "Products | Manoj Security Solutions",
    description: "Browse our wide range of security products including CCTV, Biometrics, and Smart Locks.",
};

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-background font-sans">
            <header className="bg-secondary/30 border-b border-border py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-4 text-foreground">Our Products</h1>
                    <p className="text-muted-foreground max-w-2xl">High-quality security equipment for residential and commercial use.</p>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="card p-6 border sticky top-24">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Category</label>
                                    <div className="space-y-2">
                                        {['All', 'CCTV', 'Access Control', 'Intercom', 'Safety'].map((cat) => (
                                            <div key={cat} className="flex items-center gap-2">
                                                <input type="checkbox" id={cat} className="rounded border-gray-300" />
                                                <label htmlFor={cat} className="text-sm text-muted-foreground">{cat}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                                    <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                        <span>₹0</span>
                                        <span>₹50,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-muted-foreground text-sm">Showing {products.length} products</p>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input type="text" placeholder="Search products..." className="pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64" />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="card group hover:shadow-lg transition-all border overflow-hidden bg-background">
                                    <div className="aspect-square bg-secondary flex items-center justify-center p-8 group-hover:bg-secondary/50 transition-colors relative">
                                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                                            <Package className="w-12 h-12" />
                                        </div>
                                        <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                                        <h3 className="font-bold text-foreground mb-2 truncate">{product.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary font-bold text-lg">₹{product.price.toLocaleString()}</span>
                                            <button className="text-sm font-medium text-primary hover:underline">View Details</button>
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
