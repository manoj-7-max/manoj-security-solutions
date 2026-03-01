"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "#services", label: "Expertise" },
        { href: "#pricing", label: "Plans" },
        { href: "#contact", label: "Consultation" },
        { href: "/admin", label: "Client Portal" },
    ];

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 rounded-b-3xl md:rounded-b-[3rem] ${isScrolled
                ? "bg-black/60 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl shadow-black"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group relative z-50">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 bg-black border border-white/10">
                        <img src="/logo.png" alt="Manoj Security Solutions" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-widest text-white uppercase leading-tight">Manoj</span>
                        <span className="text-[10px] tracking-[0.3em] gold-gradient-text uppercase font-bold">Security</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-zinc-400 hover:text-[#d4af37] transition-colors uppercase tracking-wider"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Action */}
                <div className="hidden md:block">
                    <Link
                        href="https://wa.me/919944305980"
                        className="px-6 py-2.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-sm font-bold uppercase tracking-wider hover:bg-[#d4af37] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                    >
                        Get Quote
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 p-2 text-zinc-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Nav */}
                <div
                    className={`fixed inset-0 bg-black/95 backdrop-blur-3xl z-40 transition-all duration-500 flex flex-col justify-center px-8 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                >
                    <div className="flex flex-col gap-8 text-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-light tracking-widest text-zinc-400 hover:text-white uppercase transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="https://wa.me/919944305980"
                            className="mt-8 mx-auto px-8 py-4 rounded-full bg-[#d4af37] text-black text-sm font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                        >
                            Request Quote
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
