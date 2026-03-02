"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Shield, Camera, Lock, Zap, Phone, MessageSquare, ArrowRight,
  CheckCircle2, Star, MapPin, Building2, Home, ShoppingBag,
  Warehouse, GraduationCap, Factory, ChevronRight, Menu, X, Mail,
  Instagram, Facebook, Youtube, Clock, Users, Award, Headphones,
  Eye, Cpu, Wifi, ScanLine, CircuitBoard, BarChart3, Fingerprint
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#packages", label: "Packages" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  { icon: Camera, title: "Advanced CCTV Systems", desc: "4K IP cameras with AI-motion detection, night vision, and 30-day cloud storage. Hikvision & Dahua certified." },
  { icon: Fingerprint, title: "Biometric Access Control", desc: "Face recognition and fingerprint-based entry systems. Touchless, hygienic, enterprise-grade." },
  { icon: Lock, title: "Smart Door Locks", desc: "App-controlled digital and smart locks. PIN, RFID, and mobile access — no keys required." },
  { icon: Eye, title: "Video Door Phones", desc: "HD video intercom systems with mobile app integration. See who's there from anywhere." },
  { icon: BarChart3, title: "Commercial Surveillance", desc: "End-to-end surveillance design for offices, warehouses, and retail. Network video recorders with remote access." },
  { icon: CircuitBoard, title: "Custom Security Architecture", desc: "Full-site security audits and custom-engineered systems. From apartments to industrial complexes." },
];

const WHY_US = [
  { icon: Shield, title: "Military-Grade Hardware", desc: "Only branded hardware — Hikvision, CP Plus, Dahua. No cheap substitutes." },
  { icon: Zap, title: "Clean Pro Installation", desc: "Concealed wiring, elegant cable management. Looks as good as it works." },
  { icon: Headphones, title: "24/7 Rapid Support", desc: "On-call technical support. Remote diagnostics and same-day service." },
  { icon: Cpu, title: "Smart Custom Solutions", desc: "No templates. Every system is designed for your exact property layout." },
  { icon: CheckCircle2, title: "Transparent Pricing", desc: "Fixed quotes before work begins. No hidden charges, ever." },
  { icon: Wifi, title: "Remote Monitoring", desc: "Watch your property live from your phone, anywhere in the world." },
];

const INDUSTRIES = [
  { icon: Home, label: "Apartments" },
  { icon: GraduationCap, label: "Schools" },
  { icon: ShoppingBag, label: "Retail Shops" },
  { icon: Warehouse, label: "Warehouses" },
  { icon: Factory, label: "Factories" },
  { icon: Building2, label: "Villas & Estates" },
];

const TESTIMONIALS = [
  { name: "Rajesh Kumar", role: "Apartment Owner, OMR Chennai", stars: 5, text: "Very clean installation and professional team. The cameras cover every angle and the app works flawlessly. Best CCTV service in Chennai." },
  { name: "Priya Subramaniam", role: "Business Owner, Tambaram", stars: 5, text: "They installed biometric systems for our entire office floor in a single day. No mess, no delays. The team is truly professional." },
  { name: "Mohammed Fayaz", role: "Villa Owner, ECR", stars: 5, text: "Outstanding service from site visit to final handover. The security architecture they designed for our villa is just brilliant." },
  { name: "Kavitha Rajan", role: "School Administrator, Chengalpattu", stars: 5, text: "Excellent work on our school campus. 24 cameras installed with clean wiring. The remote monitoring feature gives great peace of mind." },
];

const PACKAGES = [
  {
    name: "Starter Surveillance",
    price: "₹14,999",
    desc: "Ideal for homes and small apartments",
    features: ["2 HD Night-Vision Cameras", "DVR with Mobile App", "1TB Storage", "Professional Installation", "1 Year Warranty"],
    cta: "Get Started",
    highlight: false,
    badge: null,
  },
  {
    name: "Professional Shield",
    price: "₹24,999",
    desc: "Most popular for mid-sized properties",
    features: ["4 x 5MP IP Cameras", "NVR with Remote Access", "2TB HDD Storage", "Night Vision + IR", "Free 6-Month AMC"],
    cta: "Enquire Now",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Corporate Fortress",
    price: "₹34,500",
    desc: "Enterprise-grade for offices & commercial",
    features: ["8 x 5MP Network Cameras", "8-Channel Gigabit NVR", "App + Cloud Backup", "PoE Switch & CAT6 Wiring", "Free 1-Year AMC"],
    cta: "Request Demo",
    highlight: false,
    badge: null,
  },
];

const TRUST_STATS = [
  { value: "2025", label: "Founded", icon: Award },
  { value: "100+", label: "Installations", icon: Camera },
  { value: "24/7", label: "Support", icon: Headphones },
  { value: "Tamil Nadu", label: "Statewide Coverage", icon: MapPin },
];

const GALLERY_ITEMS = [
  { label: "Office Complex — 8 Cameras", cat: "Commercial", gradient: "from-blue-900/60 to-black" },
  { label: "Apartment Lobby Install", cat: "Residential", gradient: "from-purple-900/60 to-black" },
  { label: "Warehouse Perimeter Setup", cat: "Industrial", gradient: "from-green-900/60 to-black" },
  { label: "Villa Premium Package", cat: "Residential", gradient: "from-amber-900/60 to-black" },
  { label: "School Campus 24-Cam", cat: "Education", gradient: "from-cyan-900/60 to-black" },
  { label: "Retail Store Security", cat: "Commercial", gradient: "from-red-900/60 to-black" },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#020408]/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/50" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11">
            <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 animate-pulse" />
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#d4af37]/30 bg-black flex items-center justify-center group-hover:border-[#d4af37]/60 transition-colors">
              <img src="/logo.png" alt="Manoj Security" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <Shield className="w-6 h-6 text-[#d4af37] absolute" />
            </div>
          </div>
          <div>
            <div className="text-white font-bold text-lg tracking-widest uppercase leading-none">Manoj</div>
            <div className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: "#00d4ff" }}>Security Solutions</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 px-6 py-2 rounded-full glass-panel">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="px-4 py-2 rounded-full text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all uppercase tracking-wider font-medium">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+919944305980" className="btn-gold text-sm px-5 py-2.5 flex items-center gap-2">
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a href="https://wa.me/919944305980" target="_blank" rel="noopener noreferrer" className="btn-neon text-sm px-5 py-2.5 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> WhatsApp
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-zinc-400 hover:text-white p-2">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-[#020408]/97 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 p-8">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-zinc-300 hover:text-white uppercase tracking-widest transition-colors">
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-4 w-full max-w-xs mt-4">
            <a href="tel:+919944305980" className="btn-gold text-center text-sm py-4">Call Now — 99443 05980</a>
            <a href="https://wa.me/919944305980" target="_blank" rel="noopener noreferrer" className="btn-neon text-center text-sm py-4">WhatsApp Us</a>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [formData, setFormData] = useState({ name: "", phone: "", requirement: "", address: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, status: "new" }) });
      if (!res.ok) throw new Error("Failed");
      setFormStatus("success");
      setFormData({ name: "", phone: "", requirement: "", address: "" });
    } catch { setFormStatus("error"); }
    finally { setTimeout(() => setFormStatus("idle"), 4000); }
  };

  return (
    <div className="bg-[#020408] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden hex-grid">
        {/* Ambient blobs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none" style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none" style={{ background: "radial-gradient(circle, #d4af37 0%, transparent 70%)" }} />

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-0.5 opacity-5" style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)", animation: "scan-line 8s linear infinite" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="section-tag mb-6 animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
              Chennai&apos;s Premium Security Partner — Est. 2025
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-8">
              <span className="text-white block">Next-Generation</span>
              <span className="block elite-gradient-text">Security</span>
              <span className="text-white block">Infrastructure.</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10 font-light">
              AI-powered surveillance, biometric access control, and enterprise-grade protection — engineered for homes and businesses across Tamil Nadu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a href="#contact" className="btn-gold flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                <ScanLine className="w-4 h-4" /> Free Site Inspection
              </a>
              <a href="https://wa.me/919944305980" target="_blank" rel="noopener noreferrer" className="btn-neon flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                <MessageSquare className="w-4 h-4" /> WhatsApp Now
              </a>
            </div>

            {/* Trust mini-stats */}
            <div className="flex flex-wrap gap-6">
              {["Hikvision Certified", "Dahua Partner", "CP Plus Authorized", "3 Year Warranty"].map(b => (
                <div key={b} className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating shield */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] hidden xl:flex items-center justify-center pointer-events-none">
          <div className="absolute w-80 h-80 rounded-full" style={{ border: "1px solid rgba(0,212,255,0.1)", animation: "rotate-slow 30s linear infinite" }} />
          <div className="absolute w-60 h-60 rounded-full" style={{ border: "1px solid rgba(212,175,55,0.1)", animation: "rotate-slow 20s linear infinite reverse" }} />
          <Shield className="w-48 h-48 animate-float" style={{ color: "rgba(0,212,255,0.15)", filter: "drop-shadow(0 0 40px rgba(0,212,255,0.3))" }} />
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────────────────────── */}
      <section className="border-y border-white/5" style={{ background: "linear-gradient(90deg, #020408, #0a0f1a, #020408)" }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_STATS.map((s, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <s.icon className="w-5 h-5" style={{ color: "#00d4ff" }} />
                </div>
                <div>
                  <div className="text-2xl font-bold gold-gradient-text">{s.value}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section id="services" className="py-28 relative">
        <div className="absolute inset-0 hex-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-tag justify-center mb-4"><div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" /> Security Services</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Everything Your Property <br /><span className="elite-gradient-text">Needs to Stay Safe.</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">From CCTV to biometrics — we engineer complete, layered security ecosystems.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="neon-card p-8 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}>
                  <s.icon className="w-7 h-7" style={{ color: "#00d4ff" }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#00d4ff" }}>
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────── */}
      <section id="gallery" className="py-28" style={{ background: "linear-gradient(180deg, #020408 0%, #050d18 50%, #020408 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-tag justify-center mb-4"><div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" style={{ background: "#d4af37" }} /> Installation Gallery</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Real Installations. <span className="gold-gradient-text">Real Results.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_ITEMS.map((g, i) => (
              <div key={i} className={`relative group h-64 rounded-2xl overflow-hidden cursor-pointer ${i === 0 || i === 3 ? "md:h-80" : ""}`} style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${g.gradient} transition-opacity duration-500`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                  <Camera className="w-16 h-16 text-white/50" />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: "rgba(0,212,255,0.15)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)" }}>{g.cat}</span>
                  <p className="text-white font-semibold text-sm">{g.label}</p>
                </div>
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.03) 0%, transparent 100%)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ─────────────────────────────────────────────────── */}
      <section id="packages" className="py-28 relative">
        <div className="absolute inset-0 hex-grid opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-tag justify-center mb-4"><div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" style={{ background: "#d4af37" }} /> Security Packages</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Transparent Pricing. <span className="gold-gradient-text">No Surprises.</span>
            </h2>
            <p className="text-zinc-500 max-w-lg mx-auto">All packages include professional installation. Custom enterprise deployments available on request.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PACKAGES.map((p, i) => (
              <div key={i} className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${p.highlight ? "scale-105 shadow-2xl" : "hover:-translate-y-1"}`}
                style={p.highlight
                  ? { background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)", border: "1px solid rgba(0,212,255,0.35)", boxShadow: "0 0 40px rgba(0,212,255,0.15), 0 20px 60px rgba(0,0,0,0.5)" }
                  : { background: "rgba(13,17,23,0.6)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full" style={{ background: "linear-gradient(135deg, #00d4ff, #0090b3)", color: "#000" }}>
                    {p.badge}
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${p.highlight ? "neon-gradient-text" : "text-white"}`}>{p.name}</h3>
                <p className="text-zinc-500 text-sm mb-6">{p.desc}</p>
                <div className="text-4xl font-bold mb-8 gold-gradient-text">{p.price}</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlight ? "" : "text-[#d4af37]"}`} style={p.highlight ? { color: "#00d4ff" } : {}} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={p.highlight ? "btn-neon text-center text-sm py-3 rounded-xl block" : "btn-gold-outline text-center text-sm py-3 rounded-xl block"}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-zinc-600 text-sm mt-8">Custom enterprise deployments for factories, hospitals & campuses — <a href="#contact" className="underline" style={{ color: "#00d4ff" }}>Request a custom quote</a></p>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────── */}
      <section id="about" className="py-28" style={{ background: "linear-gradient(180deg, #020408 0%, #050d18 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-tag mb-4"><div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" /> Why Manoj Security</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Built for <span className="elite-gradient-text">Protection.</span> <br />Designed for <span className="gold-gradient-text">Elegance.</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8">We don&apos;t just install cameras. We engineer intelligent security ecosystems — clean, professional, and built to perform for years.</p>
              <a href="#contact" className="btn-gold text-sm flex items-center gap-2 w-fit">
                Get Free Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {WHY_US.map((w, i) => (
                <div key={i} className="glass-card p-5 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
                    <w.icon className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{w.title}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Industries <span className="neon-gradient-text">We Secure</span></h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl group cursor-pointer transition-all hover:-translate-y-1" style={{ background: "rgba(13,17,23,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}>
                  <ind.icon className="w-6 h-6" style={{ color: "#00d4ff" }} />
                </div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-bold group-hover:text-white transition-colors text-center">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-tag justify-center mb-4"><div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" style={{ background: "#d4af37" }} /> Client Testimonials</div>
            <h2 className="text-4xl md:text-5xl font-bold">They <span className="gold-gradient-text">Trusted Us.</span> You Can Too.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass-card p-8 relative overflow-hidden">
                <div className="absolute top-4 right-6 text-6xl font-serif opacity-10 text-[#d4af37] leading-none">&quot;</div>
                <div className="flex mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />)}
                </div>
                <p className="text-zinc-300 leading-relaxed mb-6 italic text-sm">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #00d4ff20, #d4af3720)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-zinc-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ──────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #050d18 0%, #020408 100%)" }}>
        <div className="absolute right-0 top-0 w-[500px] h-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle at right, #00d4ff10, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-full max-w-sm mx-auto aspect-square rounded-3xl overflow-hidden relative" style={{ border: "1px solid rgba(0,212,255,0.2)", boxShadow: "0 0 60px rgba(0,212,255,0.1)" }}>
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a1628 0%, #050d18 100%)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-40 h-40 opacity-10" style={{ color: "#00d4ff" }} />
                </div>
                <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-4">
                  <p className="text-white font-bold">Manoj R</p>
                  <p className="text-xs" style={{ color: "#00d4ff" }}>Founder & Lead Security Architect</p>
                </div>
              </div>
            </div>
            <div>
              <div className="section-tag mb-4"><div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" /> Meet the Founder</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Building Tamil Nadu&apos;s Most Trusted <span className="elite-gradient-text">Security Brand.</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Manoj R founded Manoj Security Solutions in 2025 with a singular vision — to bring enterprise-grade security systems to homes and businesses across Tamil Nadu, without compromise.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-8">
                With deep expertise in IP networking, surveillance architecture, and access control systems, every installation is personally overseen to meet the highest standards. This is not just a business — it&apos;s a commitment to protecting what matters most.
              </p>
              <div className="flex flex-wrap gap-4">
                {["100+ Installations", "Zero Callbacks", "Certified Technicians"].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-zinc-300 px-4 py-2 rounded-full" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#00d4ff" }} />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ─────────────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-tag mb-4"><div className="w-1.5 h-1.5 rounded-full" style={{ background: "#d4af37" }} /> Service Coverage</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Serving All of <span className="gold-gradient-text">Tamil Nadu.</span></h2>
              <p className="text-zinc-400 mb-6">We operate across the Chennai metro and surrounding districts, with rapid deployment capability anywhere in Tamil Nadu.</p>
              <div className="flex flex-wrap gap-2">
                {["Chennai", "Chengalpattu", "Tambaram", "OMR", "ECR", "Kancheepuram", "Vellore", "Villupuram"].map(city => (
                  <span key={city} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#d4af37" }}>
                    <MapPin className="w-3 h-3 inline mr-1" />{city}
                  </span>
                ))}
              </div>
            </div>
            {/* Map placeholder */}
            <div className="h-64 rounded-2xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628, #050d18)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                <MapPin className="w-10 h-10" style={{ color: "#00d4ff" }} />
                <p className="text-zinc-400 text-sm">Tamil Nadu, India</p>
                <p className="text-zinc-600 text-xs">Chennai • Chengalpattu • OMR • ECR</p>
              </div>
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / LEAD FORM ──────────────────────────────────────── */}
      <section id="contact" className="py-28 relative">
        <div className="absolute inset-0 hex-grid opacity-20" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,212,255,0.04), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Big CTA */}
            <div className="text-center mb-12">
              <div className="section-tag justify-center mb-4"><div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" /> Get Protected Today</div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Secure Your Property — <span className="elite-gradient-text">Starting Today.</span>
              </h2>
              <p className="text-zinc-400 text-lg">Free site inspection. No obligation. Our engineer will visit, assess, and give you a transparent quote within 24 hours.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              <a href="tel:+919944305980" className="btn-gold text-center py-4 flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href="https://wa.me/919944305980" target="_blank" rel="noopener noreferrer" className="btn-neon text-center py-4 flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
              <a href="mailto:manojsecurity2025@gmail.com" className="btn-gold-outline text-center py-4 flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>

            {/* Lead form */}
            <div className="glass-panel rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Request a Free Site Inspection</h3>
              {formStatus === "success" ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)" }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: "#00d4ff" }} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Request Received!</h4>
                  <p className="text-zinc-400">Our team will contact you within 2 hours to schedule your free site visit.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formStatus === "error" && <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-red-400 text-sm">Something went wrong. Please call us directly.</div>}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Full Name *</label>
                      <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Your name or company" className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Phone Number *</label>
                      <input required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} type="tel" placeholder="+91 99xxx xxxxx" className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none font-mono" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Property / Requirement</label>
                    <input value={formData.requirement} onChange={e => setFormData({ ...formData, requirement: e.target.value })} type="text" placeholder="e.g. 4-camera CCTV for my apartment" className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Site Address</label>
                    <input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} type="text" placeholder="Location / area" className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                  </div>
                  <button type="submit" disabled={formStatus === "submitting"} className="btn-gold w-full py-4 text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                    {formStatus === "submitting" ? "Submitting..." : <><ScanLine className="w-4 h-4" /> Request Free Inspection</>}
                  </button>
                  <p className="text-center text-zinc-600 text-xs">We typically respond within 2 hours. No spam. No obligation.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-16" style={{ background: "#020408" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-black border border-[#d4af37]/30 flex items-center justify-center">
                  <img src="/logo.png" alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <Shield className="w-5 h-5 text-[#d4af37] absolute" />
                </div>
                <div>
                  <p className="font-bold text-white uppercase tracking-widest">Manoj Security Solutions</p>
                  <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "#00d4ff" }}>Protecting What Matters Most.</p>
                </div>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">Enterprise-grade CCTV, biometrics, and access control systems for homes and businesses across Tamil Nadu.</p>
              <div className="flex gap-3 mt-6">
                {[Instagram, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            {/* Services */}
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Services</p>
              <ul className="space-y-2">
                {["CCTV Installation", "Biometric Access", "Smart Door Locks", "Video Door Phones", "AMC Plans"].map(s => (
                  <li key={s}><a href="#services" className="text-zinc-500 hover:text-white text-sm transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Contact</p>
              <div className="space-y-3">
                <a href="tel:+919944305980" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#d4af37]" /> +91 99443 05980
                </a>
                <a href="mailto:manojsecurity2025@gmail.com" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#d4af37]" /> manojsecurity2025@gmail.com
                </a>
                <div className="flex items-start gap-2 text-sm text-zinc-400">
                  <MapPin className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" /> Chengalpattu, Chennai, Tamil Nadu
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Clock className="w-4 h-4 text-[#d4af37]" /> Mon–Sat, 9AM – 7PM
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-xs">&copy; {new Date().getFullYear()} Manoj Security Solutions. All Rights Reserved. Engineered in Chengalpattu.</p>
            <div className="flex items-center gap-4">
              <a href="/admin" className="text-zinc-600 hover:text-white text-xs transition-colors">Admin Portal</a>
              <span className="text-zinc-700">|</span>
              <a href="/login" className="text-zinc-600 hover:text-white text-xs transition-colors">Staff Login</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ──────────────────────────────────────── */}
      <a
        href="https://wa.me/919944305980"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center rounded-full shadow-2xl group"
        style={{ background: "#25d366", boxShadow: "0 0 25px rgba(37,211,102,0.4)" }}
      >
        <div className="absolute inset-0 rounded-full border border-green-400 animate-ping opacity-60" />
        <MessageSquare className="w-7 h-7 text-white relative z-10" />
      </a>

      {/* ── MOBILE CALL BTN ───────────────────────────────────────── */}
      <a
        href="tel:+919944305980"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 flex items-center justify-center rounded-full shadow-2xl md:hidden"
        style={{ background: "linear-gradient(135deg, #d4af37, #b8860b)", boxShadow: "0 0 25px rgba(212,175,55,0.5)" }}
      >
        <Phone className="w-6 h-6 text-black" />
      </a>
    </div>
  );
}
