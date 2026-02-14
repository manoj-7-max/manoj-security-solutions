
"use client";

import { useState } from "react";
import { Search, Trash2, ShoppingCart, User, Phone, CheckCircle, Package, Plus, LayoutGrid, List } from "lucide-react";
import clsx from "clsx";

interface Product {
    _id: string;
    name: string;
    price: string;
    category: string;
    image?: string;
    icon?: string;
    stock?: number;
}

export default function PointOfSale({ products }: { products: Product[] }) {
    const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
    const [search, setSearch] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'products' | 'cart'>('products');

    const [manualName, setManualName] = useState("");
    const [manualPrice, setManualPrice] = useState("");

    const filteredProducts = products.filter(p =>
        (p.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (p.category?.toLowerCase() || '').includes(search.toLowerCase())
    );

    function addToCart(product: Product) {
        if (!product.stock || product.stock <= 0) {
            // Allow checking if product is manual (no stock)
            if (!product._id.startsWith('manual-')) {
                return alert("Item is Out of Stock!");
            }
        }

        const existing = cart.find(i => i._id === product._id);
        if (existing) {
            // Check if adding one more exceeds stock
            if (product.stock && existing.quantity >= product.stock && !product._id.startsWith('manual-')) {
                return alert(`Only ${product.stock} items available in stock!`);
            }
            setCart(cart.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    }

    function addManualItem() {
        if (!manualName || !manualPrice) return;
        const newItem: Product = {
            _id: `manual-${Date.now()}`,
            name: manualName,
            price: manualPrice,
            category: 'Manual',
            image: '',
            icon: ''
        };
        addToCart(newItem);
        setManualName("");
        setManualPrice("");
    }

    function removeFromCart(id: string) {
        setCart(cart.filter(i => i._id !== id));
    }

    function updateQty(id: string, delta: number) {
        setCart(cart.map(i => {
            if (i._id === id) {
                const newQty = Math.max(1, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }));
    }

    const subtotal = cart.reduce((sum, i) => sum + (parseFloat(i.price.replace(/[^0-9.]/g, '') || '0') * i.quantity), 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    async function handleCheckout() {
        if (!customerName) return alert("Please enter customer name");
        if (cart.length === 0) return alert("Cart is empty");

        setLoading(true);
        try {
            const orderData = {
                customerName,
                phone,
                items: cart.map(i => ({
                    productId: i._id,
                    name: i.name,
                    price: parseFloat(i.price.replace(/[^0-9.]/g, '') || '0'),
                    quantity: i.quantity,
                    total: parseFloat(i.price.replace(/[^0-9.]/g, '') || '0') * i.quantity
                })),
                totalAmount: total,
                paymentMethod
            };

            const res = await fetch("/api/orders", {
                method: "POST",
                body: JSON.stringify(orderData),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();

            if (data.success) {
                // WhatsApp Logic
                const text = `*Manoj Security Solutions*\nInvoice: ${data.order.invoiceNo || 'N/A'}\nDate: ${new Date().toLocaleDateString()}\n------------------------------\n${cart.map(i => `${i.name} x${i.quantity} = ₹${(parseFloat(i.price.replace(/[^0-9.]/g, '') || '0') * i.quantity).toLocaleString()}`).join('\n')}\n------------------------------\n*Total: ₹${total.toLocaleString()}*\nPayment: ${paymentMethod}\nThank you!`;

                if (phone && confirm("Order Saved! Send Bill to WhatsApp?")) {
                    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(text)}`, "_blank");
                } else {
                    alert("Order Saved Successfully!");
                }

                setCart([]);
                setCustomerName("");
                setPhone("");
                setActiveTab('products');
            } else {
                alert("Error: " + data.error);
            }
        } catch (e) {
            console.error(e);
            alert("Failed to checkout");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] overflow-hidden font-sans">

            {/* Mobile Tab Switcher */}
            <div className="md:hidden flex bg-card border-b border-border p-2 gap-2">
                <button
                    onClick={() => setActiveTab('products')}
                    className={clsx("flex-1 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2", activeTab === 'products' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}
                >
                    <LayoutGrid className="w-4 h-4" /> Products
                </button>
                <button
                    onClick={() => setActiveTab('cart')}
                    className={clsx("flex-1 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 relative", activeTab === 'cart' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}
                >
                    <ShoppingCart className="w-4 h-4" /> Cart
                    {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">{cart.length}</span>}
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden md:flex-row gap-6 relative">
                {/* Products Panel */}
                <div className={clsx(
                    "flex-1 flex flex-col card overflow-hidden relative border bg-background shadow-none h-full transition-all duration-300 absolute inset-0 md:relative",
                    activeTab === 'products' ? "translate-x-0 z-10" : "-translate-x-full md:translate-x-0 z-0 opacity-0 md:opacity-100"
                )}>
                    <div className="flex-none p-4 border-b border-border bg-muted/20 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text" placeholder="Search Products..."
                                className="input-field pl-9"
                                value={search} onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Manual Entry Form */}
                        <div className="bg-card p-3 rounded-md border border-border flex flex-wrap gap-2 items-center">
                            <div className="flex-[2] min-w-[120px]">
                                <input
                                    className="input-field py-2 text-sm"
                                    placeholder="Custom Item"
                                    value={manualName}
                                    onChange={e => setManualName(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 min-w-[80px]">
                                <input
                                    type="number"
                                    className="input-field py-2 text-sm"
                                    placeholder="Price"
                                    value={manualPrice}
                                    onChange={e => setManualPrice(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => { addManualItem(); if (window.innerWidth < 768) setActiveTab('cart'); }}
                                disabled={!manualName || !manualPrice}
                                className="btn-primary py-2 px-4 text-sm"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-muted/10 pb-24 md:pb-4">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProducts.map(p => (
                                <div
                                    key={p._id}
                                    onClick={() => addToCart(p)}
                                    className="bg-card border border-border hover:border-primary hover:shadow-md rounded-lg p-3 cursor-pointer transition-all group flex flex-col items-center text-center h-[180px] active:scale-95"
                                >
                                    <div className="h-24 w-full flex items-center justify-center mb-2 bg-secondary rounded-md p-2 relative">
                                        {p.image ? (
                                            <img src={p.image} className="h-full w-full object-contain mix-blend-multiply" alt={p.name} />
                                        ) : (
                                            <Package className="w-8 h-8 text-primary/40" />
                                        )}
                                        {(!p.stock || p.stock === 0) && (
                                            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                                <span className="text-xs font-bold text-red-500 rotate-[-12deg] border border-red-500 px-2 py-1 rounded">OUT OF STOCK</span>
                                            </div>
                                        )}
                                        {p.stock && p.stock > 0 && (
                                            <div className="absolute top-2 right-2 bg-primary/10 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Plus className="w-3 h-3 text-primary" />
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-semibold text-sm line-clamp-2 h-10 w-full flex items-center justify-center text-foreground">{p.name}</h4>
                                    <div className="flex justify-between w-full items-center mt-1">
                                        <span className="text-primary font-bold text-sm">₹{p.price}</span>
                                        <span className={`text-[10px] ${!p.stock ? 'text-red-500' : 'text-muted-foreground'}`}>
                                            {p.stock ? `${p.stock} in stock` : '0 in stock'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredProducts.length === 0 && (
                            <div className="flex flex-col h-full items-center justify-center text-muted-foreground gap-4 py-10">
                                <Package className="w-12 h-12 opacity-20" />
                                <p>No products found</p>
                                <a href="/admin/products" className="text-primary hover:underline text-sm">Manage Products</a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cart Panel */}
                <div className={clsx(
                    "w-full md:w-96 card flex flex-col h-full border border-border bg-background shadow-lg transition-all duration-300 absolute inset-0 md:relative z-20 md:z-0",
                    activeTab === 'cart' ? "translate-x-0" : "translate-x-full md:translate-x-0 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto"
                )}>
                    <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <ShoppingCart className="text-primary w-5 h-5" /> Current Order
                        </h2>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">{cart.reduce((a, b) => a + b.quantity, 0)} Items</span>
                    </div>

                    <div className="p-4 space-y-3 bg-card">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text" placeholder="Customer Name"
                                className="input-field pl-9"
                                value={customerName} onChange={e => setCustomerName(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text" placeholder="Phone Number"
                                className="input-field pl-9"
                                value={phone} onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-muted/10 border-y border-border">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground min-h-[150px]">
                                <ShoppingCart className="w-12 h-12 mb-2 opacity-10" />
                                <p className="text-sm">Cart is Empty</p>
                                <button onClick={() => setActiveTab('products')} className="mt-4 text-primary text-sm hover:underline md:hidden">Start Adding Products</button>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item._id} className="bg-card p-3 rounded-lg flex justify-between items-center group border border-border shadow-sm">
                                    <div className="flex-1 min-w-0 mr-2">
                                        <h5 className="font-medium text-sm truncate text-foreground">{item.name}</h5>
                                        <div className="text-xs text-muted-foreground">₹{item.price} x {item.quantity}</div>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0 bg-secondary rounded-md p-0.5">
                                        <button onClick={() => updateQty(item._id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded text-foreground font-medium">-</button>
                                        <span className="text-sm w-6 text-center font-mono text-foreground">{item.quantity}</span>
                                        <button onClick={() => updateQty(item._id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded text-foreground font-medium">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item._id)} className="text-muted-foreground hover:text-red-500 ml-2 p-1">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 bg-card space-y-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Tax (18%)</span>
                                <span>₹{tax.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-primary pt-2 border-t border-border mt-2">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <select
                            className="input-field"
                            value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                        >
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="Card">Card</option>
                        </select>

                        <button
                            onClick={handleCheckout}
                            disabled={loading || cart.length === 0}
                            className="btn-primary w-full py-3 flex items-center justify-center gap-2 shadow-md mb-safe"
                        >
                            {loading ? "Processing..." : (
                                <>
                                    <CheckCircle className="w-4 h-4" /> Complete Sale
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
