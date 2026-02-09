
import Link from 'next/link';
import { Shield, Lock, Camera, Fingerprint, CheckCircle, Package, Globe, Smartphone, Server, ArrowRight, UserCheck, Settings, UploadCloud, Users, HelpCircle, Phone, Menu, X } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import NavbarAuth from '@/components/NavbarAuth';
import Header from '@/components/Header';

const ServiceCard = ({ icon: Icon, title, desc, href }: { icon: any, title: string, desc: string, href: string }) => (
  <Link href={href} className="group card p-6 hover:shadow-2xl transition-all duration-300 border-border/10 bg-white hover:-translate-y-1">
    <div className="w-14 h-14 mb-4 bg-blue-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm mb-4">{desc}</p>
    <div className="flex items-center text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">
      Learn More <ArrowRight className="w-4 h-4 ml-1" />
    </div>
  </Link>
);

const ProductCard = ({ name, price, image }: { name: string; price: string; image: string }) => (
  <div className="card overflow-hidden group hover:shadow-xl transition-all duration-300 border-border bg-white">
    <div className="aspect-square bg-slate-50 flex items-center justify-center p-6 group-hover:bg-blue-50 transition-colors relative">
      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">Hot</div>
      {/* Placeholder for Product Image */}
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary shadow-md group-hover:scale-110 transition-transform duration-300">
        <Package className="w-10 h-10" />
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors truncate">{name}</h3>
      <div className="flex items-center justify-between mt-2">
        <p className="text-primary font-extrabold text-xl">₹{price}</p>
        <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-2 rounded-full transition-colors">
          <Package className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export const metadata = {
  title: "Manoj Security Solutions | Trusted Security & IT Services",
  description: "CCTV, Biometrics, Smart Security, and Professional Website Development Services.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 selection:bg-primary/20">

      {/* Enhanced Navbar with Mobile Menu */}
      <Header />

      {/* Vibrant Hero Section */}
      <section className="relative py-24 lg:py-36 overflow-hidden bg-gradient-hero text-white">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/20 blur-[100px] rounded-l-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-purple-600/20 blur-[100px] rounded-r-full"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium text-blue-200 mb-8 border border-white/10 animate-in fade-in slide-in-from-bottom-2 backdrop-blur-sm">
            <CheckCircle className="w-4 h-4 text-green-400" /> Premier Tech & Security Partner
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 ttracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            Secure Your Assets.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Digitize Your Future.</span>
          </h1>

          <p className="text-xl text-blue-100/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            A complete solution for physical security (CCTV, Biometrics) and digital growth (Websites, Apps). We protect what matters and build what connects.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <Link href="#contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all transform hover:-translate-y-1">
              Get Started Now
            </Link>
            <Link href="#products" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all transform hover:-translate-y-1">
              View Products
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 text-white/60 font-bold"><Users className="w-5 h-5" /> 500+ Clients</div>
            <div className="flex items-center gap-2 text-white/60 font-bold"><CheckCircle className="w-5 h-5" /> 5yr Warranty</div>
            <div className="flex items-center gap-2 text-white/60 font-bold"><Settings className="w-5 h-5" /> 24/7 Support</div>
          </div>
        </div>
      </section>

      {/* Expanded Services Grid */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-4 text-slate-900">Comprehensive Solutions</h2>
            <p className="text-slate-500 text-lg">From physical security infrastructure to cutting-edge digital presence, explore our wide range of services.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard icon={Camera} title="CCTV Systems" desc="HD & IP Camera installation with remote mobile viewing." href="/services/cctv" />
            <ServiceCard icon={Fingerprint} title="Biometric Access" desc="Secure attendance & door access control systems." href="/services/biometric" />
            <ServiceCard icon={Globe} title="Web Development" desc="Responsive business websites & e-commerce stores." href="/services/website-development" />
            <ServiceCard icon={Lock} title="Smart Locks" desc="Keyless entry solutions for homes & offices." href="/services/smart-locks" />
            <ServiceCard icon={Server} title="Networking" desc="Complete structured cabling and WiFi setup." href="/services/networking" />
            <ServiceCard icon={Settings} title="AMC Services" desc="Annual maintenance for all your security gear." href="/services/amc" />
            <ServiceCard icon={Smartphone} title="App Development" desc="Android & iOS mobile applications." href="/services/apps" />
            <ServiceCard icon={UploadCloud} title="Cloud Backup" desc="Secure cloud storage for CCTV footage." href="/services/cloud" />
          </div>
        </div>
      </section>

      {/* Featured Web Dev with Glassmorphism */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 skew-y-3 transform origin-bottom-right scale-110"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500 text-white text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-orange-500/40">Limited Offer</div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Get Your Business Online <br />Starting @ ₹4,999</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Stunning, SEO-optimized websites that look great on any device. Don't lose customers to competitors because you don't have a website.
              </p>
              <ul className="grid grid-cols-2 gap-4 mb-10 text-sm font-medium text-blue-50">
                {['FREE Domain Name', '1 Year Hosting', 'Corporate Email', 'SSL Security', 'SEO Basic', 'Social Integration'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/services/website-development" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Check Web Packages
              </Link>
            </div>

            {/* Visual Representation */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-2xl transform transition-transform group-hover:scale-[1.02]">
                <div className="flex items-center gap-2 mb-4 border-b pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="bg-gray-100 h-6 rounded-md w-full max-w-[200px] ml-4"></div>
                </div>
                <div className="space-y-4 animate-pulse">
                  <div className="h-40 bg-gray-100 rounded-xl w-full"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-gray-100 rounded-xl"></div>
                    <div className="h-24 bg-gray-100 rounded-xl"></div>
                    <div className="h-24 bg-gray-100 rounded-xl"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-blue-500 opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section id="products" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold mb-2 text-slate-900">Featured Products</h2>
              <p className="text-slate-500">Professional-grade security equipment.</p>
            </div>
            <Link href="/products" className="text-primary font-bold hover:text-blue-800 flex items-center gap-1 group">
              View All Inventory <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard name="4MP Night Vision Dome" price="2,800" image="/cctv.png" />
            <ProductCard name="Smart Fingerprint Lock" price="12,500" image="/lock.png" />
            <ProductCard name="Video Door Phone (7-inch)" price="8,500" image="/vdp.png" />
            <ProductCard name="Wireless GSM Alarm Kit" price="6,200" image="/fire.png" />
            <ProductCard name="8-Channel 4K NVR" price="5,800" image="/nvr.png" />
            <ProductCard name="Long Range Bullet Cam" price="3,200" image="/bullet.png" />
            <ProductCard name="RFID Attendance Device" price="4,500" image="/rfid.png" />
            <ProductCard name="360° WiFi PTZ Camera" price="2,200" image="/wifi.png" />
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider mb-6">Contact Us</div>
              <h2 className="text-4xl font-extrabold mb-6 text-slate-900">Let's Discuss Your Security Needs</h2>
              <p className="text-slate-500 mb-10 text-lg leading-relaxed">
                Whether it's a new installation, a website project, or a quick repair, our team is ready to assist you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="bg-blue-600 p-4 rounded-xl text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform"><Phone className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Direct Line</h4>
                    <p className="text-slate-600 font-medium text-lg">+91 93611 62650</p>
                    <p className="text-sm text-slate-400">Available 9 AM - 8 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-purple-600 p-4 rounded-xl text-white shadow-lg shadow-purple-600/20 group-hover:scale-110 transition-transform"><Package className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Visit Our Office</h4>
                    <p className="text-slate-600">Old Bus Stand, Aundipatti<br />Theni District, Tamil Nadu - 625512</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-green-600 p-4 rounded-xl text-white shadow-lg shadow-green-600/20 group-hover:scale-110 transition-transform"><HelpCircle className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Email Support</h4>
                    <p className="text-slate-600">support@manojsecurity.in</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-slate-800">Send an Inquiry</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-2xl text-white">Manoj Security</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Your reliable partner for advanced security infrastructure and digital transformation in Tamil Nadu.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition-colors">CCTV Installation</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Biometric Access</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Website Design</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">AMC Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Manoj Security Solutions. All rights reserved.</p>
            <p className="flex items-center gap-1">Made with <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> by Manoj Tech Team</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
