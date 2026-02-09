
import Link from 'next/link';
import { Shield, Lock, Camera, Fingerprint, CheckCircle, Package, Globe, Smartphone, Server, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import NavbarAuth from '@/components/NavbarAuth';

const ServiceCard = ({ icon: Icon, title, desc, href }: { icon: any, title: string, desc: string, href: string }) => (
  <Link href={href} className="group card p-6 hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20 bg-card">
    <div className="w-12 h-12 mb-4 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-muted-foreground leading-relaxed text-sm mb-4">{desc}</p>
    <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
      Learn More <ArrowRight className="w-4 h-4 ml-1" />
    </div>
  </Link>
);

const ProductCard = ({ name, price, image }: { name: string; price: string; image: string }) => (
  <div className="card overflow-hidden group hover:shadow-lg transition-all duration-300 border-border bg-card">
    <div className="aspect-square bg-secondary flex items-center justify-center p-6 group-hover:bg-secondary/50 transition-colors">
      {/* Placeholder for Product Image */}
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
        <Package className="w-10 h-10" />
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{name}</h3>
      <p className="text-primary font-bold text-lg mb-3">₹{price}</p>
      <button className="btn-primary w-full text-sm py-2">
        Add to Cart
      </button>
    </div>
  </div>
);

export const metadata = {
  title: "Manoj Security Solutions | Trusted Security & IT Services",
  description: "CCTV, Biometrics, Smart Security, and Professional Website Development Services.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-primary/10">
      {/* Navbar */}
      <header className="sticky top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Manoj Security
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#services" className="hover:text-primary transition-colors">Services</Link>
            <Link href="/services/website-development" className="hover:text-primary transition-colors">Web Dev</Link>
            <Link href="#products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <NavbarAuth />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-primary mb-6 border border-border animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle className="w-3 h-3" /> Premier Tech & Security Partner
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            Secure Your Assets.<br />
            <span className="text-primary">Digitize Your Business.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            We provide comprehensive security solutions (CCTV, Biometrics) and professional website development services to help your business grow safely.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <Link href="#contact" className="btn-primary px-8 py-4 text-lg h-auto shadow-md hover:shadow-xl transition-all">
              Get Started
            </Link>
            <Link href="#services" className="btn-secondary px-8 py-4 text-lg h-auto border border-border hover:bg-secondary/80">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Comprehensive Solutions</h2>
            <p className="text-muted-foreground">From physical security to digital presence, we have you covered.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={Camera}
              title="CCTV Surveillance"
              desc="High-definition IP cameras with night vision, motion detection, and mobile monitoring for 24/7 security."
              href="/services/cctv"
            />
            <ServiceCard
              icon={Fingerprint}
              title="Biometric Access"
              desc="Advanced fingerprint and face recognition systems for secure attendance and access control."
              href="/services/biometric"
            />
            <ServiceCard
              icon={Globe}
              title="Website Development"
              desc="Professional business websites, e-commerce stores, and custom web applications tailored to your brand."
              href="/services/website-development"
            />
            <ServiceCard
              icon={Lock}
              title="Smart Automation"
              desc="Video door phones, smart locks, and gate automation for modern homes and offices."
              href="/services/automation"
            />
            <ServiceCard
              icon={Server}
              title="AMC Services"
              desc="Annual maintenance contracts to ensure your security systems run smoothly without interruption."
              href="/services/amc"
            />
            <ServiceCard
              icon={Smartphone}
              title="Mobile Apps"
              desc="Custom mobile application development for Android and iOS platforms."
              href="/services/mobile-apps"
            />
          </div>
        </div>
      </section>

      {/* Web Dev Feature Highlight */}
      <section className="py-20 lg:py-28 overflow-hidden bg-primary text-primary-foreground relative">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-4">New Service</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Build Your Online Presence</h2>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                Don't just secure your physical shop—expand it online. We build stunning, fast, and SEO-optimized websites that convert visitors into customers.
              </p>
              <ul className="space-y-4 mb-8">
                {['Custom Design', 'Mobile Responsive', 'SEO Friendly', 'E-commerce Ready'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="bg-primary-foreground/20 p-1 rounded-full"><CheckCircle className="w-4 h-4" /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services/website-development" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
                View Web Packages
              </Link>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center">
              <Globe className="w-32 h-32 opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">Featured Products</h2>
              <p className="text-muted-foreground">Top-rated security equipment for your home and office.</p>
            </div>
            <Link href="/products" className="text-primary font-medium hover:underline flex items-center gap-1">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard name="4MP IP Dome Camera" price="2,800" image="/cctv.png" />
            <ProductCard name="Biometric Glass Door Lock" price="12,500" image="/lock.png" />
            <ProductCard name="Video Door Phone Kit" price="8,500" image="/vdp.png" />
            <ProductCard name="Wireless Fire Alarm" price="4,200" image="/fire.png" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Get in Touch</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Ready to upgrade your security or build your website? Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary"><Smartphone className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-foreground">Call Us</h4>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-xs text-muted-foreground">Mon-Sat, 9am - 7pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary"><Package className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-foreground">Visit Our Store</h4>
                    <p className="text-muted-foreground">123, Tech Plaza, Main Road,<br />City Center, New Delhi - 110001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8 bg-background shadow-lg border-border">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t border-border/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6" />
                <span className="font-bold text-xl">Manoj Security Solutions</span>
              </div>
              <p className="text-background/60 max-w-sm">
                Your trusted partner for advanced security systems and professional web development services.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li><Link href="#" className="hover:text-white">CCTV Installation</Link></li>
                <li><Link href="#" className="hover:text-white">Biometric Access</Link></li>
                <li><Link href="#" className="hover:text-white">Website Design</Link></li>
                <li><Link href="#" className="hover:text-white">AMC Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-background/60">
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/40">
            <p>&copy; {new Date().getFullYear()} Manoj Security Solutions. All rights reserved.</p>
            <p>Designed with Next.js & Tailwind</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
