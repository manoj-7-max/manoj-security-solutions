
import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Wrench } from 'lucide-react';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import Image from 'next/image';

// Force dynamic since we are fetching from DB
export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Our Services | Manoj Security Solutions",
    description: "Explore our professional security and IT services including CCTV installation, biometric access, and web development.",
};

export default async function ServicesPage() {
    await dbConnect();
    const services = await Service.find().sort({ createdAt: -1 });

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <div className="bg-primary text-white py-20 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Professional Services</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Tailored security and digital solutions to protect your assets and grow your business.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {services.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
                        <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-500 mb-2">No Services Listed Yet</h3>
                        <p className="text-gray-400">Please check back later or contact us directly.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service: any) => (
                            <div key={service._id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                                <div className="h-48 bg-slate-100 relative flex items-center justify-center overflow-hidden">
                                    {service.image ? (
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={service.image}
                                                alt={service.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        </div>
                                    ) : (
                                        <Shield className="w-16 h-16 text-slate-300" />
                                    )}
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <span className="bg-primary/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                                            {service.category || 'Service'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">{service.name}</h2>
                                    <p className="text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Starting At</p>
                                            <p className="text-xl font-extrabold text-primary">₹{service.basePrice}</p>
                                        </div>
                                        <Link
                                            href={`/services/${service._id}/book`}
                                            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/30 flex items-center gap-2 group-hover:scale-105 transition-transform"
                                        >
                                            Book Now <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
