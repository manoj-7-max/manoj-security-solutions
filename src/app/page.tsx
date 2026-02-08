
import Link from 'next/link';
import { Shield, Lock, Camera, Fingerprint, CheckCircle, Package } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const ProductCard = ({ name, price, image }: { name: string; price: string; image: string }) => (
  <div className="glass-panel p-6 flex flex-col items-center group hover:bg-white/5 transition-colors">
    <div className="w-24 h-24 mb-4 bg-white/5 rounded-full flex items-center justify-center text-primary group-hover:drop-shadow-[0_0_15px_rgba(102,252,241,0.3)] transition-all">
      <Package className="w-10 h-10" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
    <p className="text-primary font-bold text-lg mb-4">₹{price}</p>
    <Link href="#contact" className="btn-primary w-full text-center text-sm">
      Enquire Now
    </Link>
  </div>
);


export const metadata = {
  title: "Manoj Security Solutions | Advanced Security Systems",
  description: "CCTV, Biometrics, and Smart Security installation services.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Shield className="w-8 h-8 text-primary group-hover:drop-shadow-[0_0_8px_rgba(102,252,241,0.5)] transition-all" />
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
              Manoj Security
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <Link href="#services" className="hover:text-white transition-colors">Services</Link>
            <Link href="#products" className="hover:text-white transition-colors">Products</Link>
            <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
          <Link href="/login" className="btn-primary text-sm px-6 py-2 shadow-lg shadow-primary/10 hover:shadow-primary/30">
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center relative overflow-hidden pt-32 pb-20">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <CheckCircle className="w-3 h-3" /> #1 Security Provider in the Region
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            <span className="text-white">Secure Your</span> <br />
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">World Today.</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Professional CCTV installation, Biometric Access Systems, and Smart Security solutions tailored for your safety.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link href="#contact" className="btn-primary px-8 py-4 text-lg rounded-full">
              Get Free Quote
            </Link>
            <Link href="#services" className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white font-medium">
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-surface/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Premium Services</h2>
            <p className="text-gray-400 max-w-xl mx-auto">We provide end-to-end security implementation using the latest technology.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Camera, title: "CCTV Surveillance", desc: "High-Definition IP Cameras with Night Vision and Mobile Access." },
              { icon: Fingerprint, title: "Biometric Access", desc: "Fingerprint, Face Recognition, and RFID Card systems for offices." },
              { icon: Lock, title: "Smart Automation", desc: "Digital Video Door Phones and Remote Gate Automation." }
            ].map((s, i) => (
              <div key={i} className="glass-panel p-8 text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="mx-auto w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                  <s.icon className="w-8 h-8 text-primary group-hover:text-background transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Top Products</h2>
            <p className="text-gray-400">Industry-leading equipment for maximum security.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <ProductCard name="4MP IP Camera" price="2800" image="/cctv.png" />
            <ProductCard name="Biometric Lock" price="12500" image="/lock.png" />
            <ProductCard name="Video Door Phone" price="8500" image="/vdp.png" />
            <ProductCard name="Fire Alarm" price="4200" image="/fire.png" />
          </div>

          <div className="text-center mt-12">
            <Link href="#contact" className="text-primary hover:text-white underline underline-offset-4 transition-colors">
              View Full Catalog on Request
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto glass-panel p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 text-white">Get in Touch</h2>
              <p className="text-gray-400">Fill out the form and we'll get back to you within 24 hours.</p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-surface text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <Shield className="w-6 h-6" />
            <span className="font-bold text-lg">Manoj Security Solutions</span>
          </div>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} All rights reserved. Built with Next.js & Tailwind.</p>
        </div>
      </footer>
    </div>
  );
}
