
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        const body = await req.json();

        let userId = null;

        // If logged in, use session ID
        if (session?.user?.id) {
            userId = session.user.id;
        } else {
            // Guest Booking (Simplified: in real app, force login or create guest user)
            // For now, allow bookings without user if no session (or better: require login)
            // Ideally: return 401 if strict.
            // Let's create a temporary user based on phone/email if provided (not provided in this form yet)
            // For this iteration, we require login or associate later.
            // Let's assume user must be logged in for now to keep it simple, or use a "Guest" placeholder.
            if (!userId) {
                return NextResponse.json({ error: 'Please login to book a service' }, { status: 401 });
            }
        }

        const booking = await Booking.create({
            userId: userId,
            serviceId: body.serviceId,
            serviceName: body.serviceName, // Denormalize for easier display
            date: new Date(body.date),
            timeSlot: body.time,
            address: body.address,
            notes: body.notes,
            status: 'Pending'
        });

        return NextResponse.json({ success: true, booking });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    let query: any = {};
    const { searchParams } = new URL(req.url);
    const role = session.user.role;

    // View own bookings only, unless admin
    if (role === 'admin') {
        // Admin sees all
    } else if (role === 'staff') {
        // Staff sees only assigned bookings
        query.technicianId = session.user.id;
    } else {
        // User sees only their own bookings
        query.userId = session.user.id;
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
}
