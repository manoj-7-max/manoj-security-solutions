import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id;
        const userRole = (session?.user as any)?.role;

        let query = {};
        // If technician, only show their assigned jobs
        if (userRole === "technician") {
            query = { assignedTo: userId };
        }

        const jobs = await Job.find(query).populate("assignedTo", "name email").sort({ createdAt: -1 });
        return NextResponse.json({ jobs }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();

        // Security check - super admin and staff can create jobs
        const session = await getServerSession(authOptions);
        const userRole = (session?.user as any)?.role;

        if (userRole !== "admin" && userRole !== "staff") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { title, customerName, customerPhone, address, assignedTo, notes } = body;

        if (!title || !customerName || !address) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newJob = await Job.create({
            title, customerName, customerPhone, address, assignedTo, notes
        });

        return NextResponse.json({ message: "Job assigned successfully", job: newJob }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to create job", details: error.message }, { status: 500 });
    }
}
