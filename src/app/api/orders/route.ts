import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Lead from "@/models/Lead";
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const session: any = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = (session as any).user?.email;
        const userName = (session as any).user?.name;

        // Fetch bookings (Leads) for this user by email
        const bookings = await Lead.find({ email: userEmail }).sort({ createdAt: -1 });

        // Fetch orders/installations (Jobs) related to this user by customerName matching the user's name
        const orders = await Job.find({ customerName: new RegExp(userName, "i") }).sort({ createdAt: -1 });

        return NextResponse.json({ bookings, orders }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch user data", details: error.message }, { status: 500 });
    }
}
