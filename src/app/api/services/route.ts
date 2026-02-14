
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
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'staff')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const body = await req.json();

        const service = await Service.create({
            name: body.name,
            description: body.description,
            basePrice: body.basePrice, // Can be "500" or "Contact for Quote"
            category: body.category,
            duration: body.duration,
            image: body.image,
            icon: body.icon
        });

        return NextResponse.json(service);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
