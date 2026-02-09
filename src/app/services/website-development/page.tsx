
import Link from 'next/link';
import { CheckCircle, Globe, ShoppingCart, Smartphone, Code, BarChart, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import BackButton from '@/components/BackButton';

export const metadata = {
    title: "Website Development Services | Manoj Security Solutions",
    description: "Professional website design, e-commerce development, and SEO services.",
};

export default function WebsiteDevelopmentPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <header className="py-20 bg-white relative overflow-hidden border-b border-gray-100">
                <div className="absolute top-0 left-0 w-full h-full bg-blue-50/50 -z-10"></div>
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-6 flex justify-center">
                        <BackButton label="Back to Home" className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <Globe className="w-4 h-4" /> Digital Services
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
                        We Build High-Performance <br className="hidden md:block" />
                        <span className="text-blue-600">Business Websites</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Transform your business with a professional online presence. We create fast, secure, and SEO-optimized websites tailored to your needs.
                    </p>
                </div>
            </header>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card p-8 border hover:shadow-xl transition-all bg-white group">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Globe className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-800">Corporate Websites</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">Professional informational websites for businesses, schools, and institutions to showcase services and build trust.</p>
                            <ul className="space-y-3 mb-6 text-sm text-slate-600 font-medium">
                                <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-green-500" /> 5-10 Custom Pages</li>
                                <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-green-500" /> Mobile Responsive</li>
                                <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-green-500" /> Contact Forms & Map</li>
                            </ul>
                            <button className="w-full py-3 border border-blue-200 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">Get Quote</button>
                        </div>

                        <div className="card p-8 border-2 border-blue-500/20 hover:border-blue-500 hover:shadow-xl transition-all bg-white relative group transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase">Popular</div>
                            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ShoppingCart className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-800">E-Commerce Stores</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">Full-featured online stores with payment gateway integration, inventory management, and admin panel.</p>
                            <ul className="space-y-3 mb-6 text-sm text-slate-600 font-medium">
                                <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-green-500" /> Unlimited Products</li>
                                <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-green-500" /> Payment Gateway (UPI/Card)</li>
                                <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-green-500" /> Admin Dashboard</li>
                            </ul>
                            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Start Selling</button>
                        </div>

                        <div className="card p-8 border hover:shadow-xl transition-all bg-white group">
                            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <Code className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-800">Custom Web Apps</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">Tailor-made web applications for internal business processes, customer portals, or SaaS products.</p>
                            <ul className="space-y-3 mb-6 text-sm text-slate-600 font-medium">
                                <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-green-500" /> React / Next.js Technology</li>
                                <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-green-500" /> Database Integration</li>
                                <li className="flex gap-2 items-center"><CheckCircle className="w-5 h-5 text-green-500" /> Secure Authentication</li>
                            </ul>
                            <button className="w-full py-3 border border-purple-200 text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-colors">Contact Us</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-12 text-slate-900">Why Choose Us?</h2>
                    <div className="grid sm:grid-cols-2 gap-8 text-left">
                        <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors">
                            <div className="bg-white p-3 rounded-xl shadow-sm h-fit text-blue-600"><Smartphone className="w-6 h-6" /></div>
                            <div>
                                <h4 className="font-bold text-lg mb-2 text-slate-800">Mobile First Design</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">Every website we build is fully responsive and looks great on all devices.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors">
                            <div className="bg-white p-3 rounded-xl shadow-sm h-fit text-blue-600"><BarChart className="w-6 h-6" /></div>
                            <div>
                                <h4 className="font-bold text-lg mb-2 text-slate-800">SEO Optimized</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">Built with best practices to help you rank higher on Google search results.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors">
                            <div className="bg-white p-3 rounded-xl shadow-sm h-fit text-blue-600"><CheckCircle className="w-6 h-6" /></div>
                            <div>
                                <h4 className="font-bold text-lg mb-2 text-slate-800">Fast Performance</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">Optimized for speed to ensure your visitors stay engaged.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors">
                            <div className="bg-white p-3 rounded-xl shadow-sm h-fit text-blue-600"><Code className="w-6 h-6" /></div>
                            <div>
                                <h4 className="font-bold text-lg mb-2 text-slate-800">Latest Technology</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">We use modern tech stacks like Next.js, React, and Tailwind CSS.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-slate-900">Start Your Project</h2>
                        <p className="text-slate-500">Fill out the form below to get a free quote for your website.</p>
                    </div>

                    <div className="card p-8 border shadow-xl bg-white rounded-3xl">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
