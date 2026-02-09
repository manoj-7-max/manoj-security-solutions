
"use client";

import Link from 'next/link';
import { Shield, Menu, X, Home, Wrench, Package, Phone, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import NavbarAuth from '@/components/NavbarAuth';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { href: "/", label: "Home", icon: Home },
        { href: "/#services", label: "Services", icon: Wrench },
        { href: "/services/website-development", label: "Web Dev", icon: Globe },
        { href: "/products", label: "Products", icon: Package },
        { href: "/#contact", label: "Contact", icon: Phone },
    ];

    return (
        <header
            className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-2' : 'bg-transparent py-4'}`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group z-50 relative">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 rounded-xl shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-105">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-lg sm:text-lg font-extrabold tracking-tight leading-none transition-colors ${isScrolled || mobileMenuOpen ? 'text-slate-800' : 'text-slate-800'}`}>
                            Manoj Security
                        </span>
                        <span className="text-[10px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Solutions</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-500 items-center">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <NavbarAuth />
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 p-2 text-slate-600"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <nav className="flex flex-col gap-6 text-lg font-medium text-slate-600">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
                            >
                                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                                    <link.icon className="w-5 h-5" />
                                </div>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 border-t border-gray-100 pt-6">
                        <p className="text-sm text-slate-400 mb-4 font-bold uppercase tracking-wider">Account</p>
                        <div className="flex justify-start">
                            <NavbarAuth />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
