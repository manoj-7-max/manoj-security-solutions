
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    await dbConnect();
    const services = await Service.find().sort({ createdAt: -1 });
    return NextResponse.json(services);
}

export async function POST(req: Request) {
    // Check Authentication
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'staff')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const formData = await req.formData();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const featuresRaw = formData.get('features') as string;

        let features: string[] = [];
        try {
            features = JSON.parse(featuresRaw);
        } catch (e) {
            // Fallback if not valid JSON
            features = featuresRaw ? [featuresRaw] : [];
        }

        // Handle Image if present (future improvement)
        // For now, ServiceList only sends text data.

        const service = await Service.create({
            name,
            description,
            features,
            // image, icon can be added later
        });

        return NextResponse.json(service);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
