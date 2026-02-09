
import Link from 'next/link';
import { CheckCircle, Globe, ShoppingCart, Smartphone, Code, BarChart, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
    title: "Website Development Services | Manoj Security Solutions",
    description: "Professional website design, e-commerce development, and SEO services.",
};

export default function WebsiteDevelopmentPage() {
    return (
        <div className="min-h-screen bg-background font-sans">
            <header className="py-20 bg-secondary/30 border-b border-border">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
                        <Globe className="w-3 h-3" /> Digital Services
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                        We Build High-Performance <br className="hidden md:block" />
                        <span className="text-primary">Business Websites</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Transform your business with a professional online presence. We create fast, secure, and SEO-optimized websites tailored to your needs.
                    </p>
                </div>
            </header>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card p-8 border hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">Corporate Websites</h3>
                            <p className="text-muted-foreground mb-6">Professional informational websites for businesses, schools, and institutions to showcase services and build trust.</p>
                            <ul className="space-y-2 mb-6 text-sm text-foreground/80">
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 5-10 Pages</li>
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Mobile Responsive</li>
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Contact Forms</li>
                            </ul>
                        </div>

                        <div className="card p-8 border hover:shadow-lg transition-all ring-1 ring-primary/20 bg-primary/5">
                            <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-6">
                                <ShoppingCart className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">E-Commerce Stores</h3>
                            <p className="text-muted-foreground mb-6">Full-featured online stores with payment gateway integration, inventory management, and admin panel.</p>
                            <ul className="space-y-2 mb-6 text-sm text-foreground/80">
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Unlimited Products</li>
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Payment Gateway (UPI/Card)</li>
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Admin Dashboard</li>
                            </ul>
                        </div>

                        <div className="card p-8 border hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                                <Code className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">Custom Web Apps</h3>
                            <p className="text-muted-foreground mb-6">Tailor-made web applications for internal business processes, customer portals, or SaaS products.</p>
                            <ul className="space-y-2 mb-6 text-sm text-foreground/80">
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> React / Next.js Technology</li>
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Database Integration</li>
                                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Secure Authentication</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-8 text-foreground">Why Choose Us?</h2>
                    <div className="grid sm:grid-cols-2 gap-8 text-left">
                        <div className="flex gap-4">
                            <div className="bg-white p-3 rounded-lg shadow-sm h-fit"><Smartphone className="w-6 h-6 text-primary" /></div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Mobile First Design</h4>
                                <p className="text-muted-foreground text-sm">Every website we build is fully responsive and looks great on all devices.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white p-3 rounded-lg shadow-sm h-fit"><BarChart className="w-6 h-6 text-primary" /></div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">SEO Optimized</h4>
                                <p className="text-muted-foreground text-sm">Built with best practices to help you rank higher on Google search results.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white p-3 rounded-lg shadow-sm h-fit"><CheckCircle className="w-6 h-6 text-primary" /></div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Fast Performance</h4>
                                <p className="text-muted-foreground text-sm">Optimized for speed to ensure your visitors stay engaged.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white p-3 rounded-lg shadow-sm h-fit"><Code className="w-6 h-6 text-primary" /></div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Latest Technology</h4>
                                <p className="text-muted-foreground text-sm">We use modern tech stacks like Next.js, React, and Tailwind CSS.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-foreground">Start Your Project</h2>
                        <p className="text-muted-foreground">Fill out the form below to get a free quote for your website.</p>
                    </div>

                    <div className="card p-8 border shadow-lg bg-background">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
