
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find all users with role 'staff'
    const staffMembers = await User.find({ role: 'staff' }).select('name email phone _id');
    return NextResponse.json(staffMembers);
}
