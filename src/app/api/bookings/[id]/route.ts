
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    // Verify ownership or admin/staff role
    const booking = await Booking.findById(id);
    if (!booking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const isOwner = booking.userId.toString() === session.user.id;
    const isAdmin = session.user.role === 'admin';
    const isStaff = session.user.role === 'staff' && booking.technicianId?.toString() === session.user.id;

    if (!isOwner && !isAdmin && !isStaff) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Forbidden: User cannot change status to anything other than Cancelled
    if (isOwner && !isAdmin && !isStaff && body.status && body.status !== 'Cancelled') {
        return NextResponse.json({ error: 'You can only cancel your booking' }, { status: 403 });
    }

    // Perform Update
    const updatedBooking = await Booking.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json(updatedBooking);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await Booking.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
}
