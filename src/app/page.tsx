"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Camera, Lock, Zap, ArrowRight, Phone, MessageSquare, Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";

// Sample static data for now, since it's the first step before backend integration
const services = [
  {
    title: "Sovereign Surveillance",
    desc: "Military-grade 4K networking cameras with AI-powered perimeter defense.",
    icon: Camera,
  },
  {
    title: "Biometric Architecture",
    desc: "Touchless face-recognition access control for enterprise compliance.",
    icon: Zap,
  },
  {
    title: "Smart Autonomy",
    desc: "App-controlled digital locks and smart infrastructure management.",
    icon: Lock,
  },
];

export default function LuxuryHome() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Custom Security Package");

  const openBookingModal = (planName: string) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-[#d4af37]/30 selection:text-white">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Parallax Background Effects */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
          <div className="w-[800px] h-[800px] bg-gradient-to-tr from-[#d4af37]/10 to-yellow-600/5 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[10s]"></div>
        </motion.div>

        {/* Grid Texture Overlay */}
        <div className="absolute inset-0 z-0 bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel border border-[#d4af37]/30 text-[#d4af37] font-medium text-xs tracking-[0.2em] uppercase backdrop-blur-3xl shadow-[0_0_40px_rgba(212,175,55,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              Next-Gen Security Architecture
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.9] mb-8 font-display"
          >
            Protecting <br />
            <span className="gold-gradient-text italic font-serif">The Elite.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-2xl text-zinc-400 max-w-2xl font-light tracking-wide leading-relaxed mb-12"
          >
            Manoj Security Solutions builds uncompromising, military-grade digital and physical security integrations for visionary brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <button onClick={() => openBookingModal("General Consultation")} className="btn-gold group flex items-center gap-3 w-full sm:w-auto justify-center text-sm uppercase tracking-widest">
              <Phone className="w-4 h-4" /> Book Consultation
            </button>
            <a href="https://wa.me/919944305980" className="btn-gold-outline group flex items-center gap-3 w-full sm:w-auto justify-center text-sm uppercase tracking-widest">
              <MessageSquare className="w-4 h-4 group-hover:text-white transition-colors" /> Message Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES / EXPERTISE --- */}
      <section id="services" className="py-32 relative z-20 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h2 className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-[#d4af37]/50" /> Portfolio of Expertise
              </h2>
              <h3 className="text-4xl md:text-6xl font-display font-light leading-tight">
                Architectural Level <br /> <span className="font-bold">Security Integration.</span>
              </h3>
            </motion.div>

            <a href="/services" className="text-zinc-500 hover:text-[#d4af37] text-sm uppercase tracking-widest flex items-center gap-2 group transition-colors pb-2 border-b border-transparent hover:border-[#d4af37]">
              View All Systems <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((srv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="glass-card p-10 group relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[#d4af37]/30 transition-all duration-700"></div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 flex items-center justify-center mb-8 group-hover:border-[#d4af37]/50 group-hover:-rotate-[-5deg] transition-all duration-300 shadow-xl">
                  <srv.icon className="w-8 h-8 text-[#d4af37]" />
                </div>

                <h4 className="text-2xl font-display font-medium mb-4">{srv.title}</h4>
                <p className="text-zinc-500 leading-relaxed font-light text-lg">{srv.desc}</p>

                <div className="mt-10 flex items-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#d4af37] text-sm font-bold uppercase tracking-widest gap-2">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PREMIUM BENTO GRID (ABOUT) --- */}
      <section className="py-32 relative bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card md:col-span-2 md:row-span-2 p-12 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              {/* Abstract luxury texture or image placeholder */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2660&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"></div>

              <div className="relative z-20 flex justify-between items-start">
                <Shield className="w-12 h-12 text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,1)]" />
                <span className="glass-panel px-4 py-2 rounded-full text-xs font-bold tracking-widest text-zinc-300 uppercase">Since 2020</span>
              </div>

              <div className="relative z-20 mt-32">
                <h3 className="text-4xl md:text-5xl font-display font-medium mb-6">Zero Compromise.</h3>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-md font-light">From discrete residential bunkers to sprawling corporate parks in Chennai. We design systems that never sleep.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card md:col-span-1 p-8 flex flex-col justify-center items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#d4af37] group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-4xl font-display font-medium mb-2">500+</h4>
              <p className="text-zinc-500 text-xs tracking-widest uppercase font-bold">Secure Facilities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card md:col-span-1 bg-[#d4af37] text-black p-8 flex flex-col justify-center items-center text-center group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-yellow-700 to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h4 className="text-4xl font-display font-medium mb-4 leading-tight">Require a <br />Site Visit?</h4>
                <a href="#contact" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-[#d4af37] hover:scale-110 transition-transform shadow-2xl shadow-black/50">
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card md:col-span-2 p-8 flex items-center justify-between group"
            >
              <div>
                <h4 className="text-2xl font-display font-medium mb-2">Priority AMC</h4>
                <p className="text-zinc-500 text-sm">24/7 dedicated support protocol.</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000 group-hover:border-[#d4af37]">
                <Calendar className="w-8 h-8 text-[#d4af37]" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- PRICING & BOOKING --- */}
      <section id="pricing" className="py-32 relative z-20 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-[#d4af37]/50" /> Direct Procurement
            </h2>
            <h3 className="text-4xl md:text-6xl font-display font-light leading-tight">
              Enterprise <span className="font-bold">Security Plans.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Base Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 flex flex-col relative overflow-hidden group"
            >
              <h4 className="text-2xl font-display font-medium text-white mb-2">Base Protocol</h4>
              <p className="text-zinc-500 font-light text-sm mb-6 h-10">Essential 4-Camera HD setup for residential parameters.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">₹14,999</span><span className="text-zinc-500">/inclusive</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['4x 2MP Night Vision Cameras', '4-Channel Smart DVR', '1TB WD Purple HDD', 'Wiring & standard installation'].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => openBookingModal("Base Protocol - ₹14,999")} className="w-full btn-gold-outline py-3 text-sm border-white/10 text-white hover:text-[#d4af37] hover:border-[#d4af37]">
                Procure Plan
              </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 flex flex-col relative overflow-hidden group border-[#d4af37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] transform md:-translate-y-4"
            >
              <div className="absolute top-0 right-0 bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">Most Requested</div>
              <h4 className="text-2xl font-display font-medium text-[#d4af37] mb-2">Corporate Arsenal</h4>
              <p className="text-zinc-400 font-light text-sm mb-6 h-10">Advanced 8-Camera 5MP IP setup with audio & face detection.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">₹34,500</span><span className="text-[#d4af37]/50">/inclusive</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['8x 5MP IP Network Cameras', '8-Channel Gigabit NVR', '2TB Enterprise Storage', 'PoE Switch & CAT6 Wiring', 'Free 1st Year AMC'].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => openBookingModal("Corporate Arsenal - ₹34,500")} className="w-full btn-gold py-3 text-sm shadow-xl">
                Procure Plan
              </button>
            </motion.div>

            {/* Custom Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8 flex flex-col relative overflow-hidden group"
            >
              <h4 className="text-2xl font-display font-medium text-white mb-2">Custom Perimeter</h4>
              <p className="text-zinc-500 font-light text-sm mb-6 h-10">Biometrics, EPABX, or vast industrial multi-cam setups.</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">Variable</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Custom Architectural Blueprint', 'Access Control Integration', 'Smart Home Protocols', 'Priority Military-grade AMC'].map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-zinc-500 shrink-0 group-hover:text-[#d4af37] transition-colors" />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => openBookingModal("Custom Perimeter Evaluation")} className="w-full btn-gold-outline py-3 text-sm border-white/10 text-white hover:text-[#d4af37] hover:border-[#d4af37]">
                Request Evaluation
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTACT / LEAD INJECTION --- */}
      <section id="contact" className="py-32 relative border-t border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="glass-card p-1">
            <div className="bg-[#0a0a0a] rounded-[15px] p-8 md:p-16 flex flex-col lg:flex-row gap-16 relative overflow-hidden">
              {/* Sparkle Glows */}
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full"></div>

              <div className="lg:w-1/2 relative z-10">
                <h2 className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-[#d4af37]" /> Secure Dialogue
                </h2>
                <h3 className="text-4xl md:text-5xl font-display font-medium leading-tight mb-8">
                  Initiate your <br /><span className="italic font-serif text-white/50">security protocol.</span>
                </h3>
                <p className="text-zinc-500 leading-relaxed font-light text-lg mb-12 max-w-md">
                  Connect with our engineering team to architect a robust, scalable security framework for your premises.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-all duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-600 mb-1">Direct Line</p>
                      <p className="text-xl font-medium tracking-wider">+91 99443 05980</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative z-10">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs tracking-[0.2em] uppercase font-bold text-zinc-500">Entity / Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/10 pb-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors font-light text-lg rounded-none" placeholder="Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-[0.2em] uppercase font-bold text-zinc-500">Contact Number</label>
                    <input type="tel" className="w-full bg-transparent border-b border-white/10 pb-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors font-light text-lg rounded-none" placeholder="+91" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-[0.2em] uppercase font-bold text-zinc-500">Requirement Overview</label>
                    <textarea className="w-full bg-transparent border-b border-white/10 pb-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors font-light text-lg min-h-[100px] resize-none rounded-none" placeholder="We need to secure a 10,000 sq ft warehouse..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#d4af37] transition-colors duration-500 shadow-xl">
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MINIMAL FOOTER --- */}
      <footer className="py-12 border-t border-white/10 bg-black text-center">
        <div className="container mx-auto px-6">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-black border border-white/10 mx-auto mb-6 opacity-80 flex items-center justify-center">
            <img src="/logo.png" alt="Manoj Security Solutions" className="w-full h-full object-cover" />
          </div>
          <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] font-bold mb-2">Manoj Security Solutions</p>
          <p className="text-zinc-700 text-xs">&copy; {new Date().getFullYear()} All Rights Reserved. Engineered in Chengalpattu.</p>
        </div>
      </footer>
      {/* Booking Modal Popup */}
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} planName={selectedPlan} />

    </div>
  );
}
