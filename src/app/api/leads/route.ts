import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Lead from "@/models/Lead";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const { name, phone, email, address, requirement, visitDate, notes } = body;

        if (!name || !phone || !requirement) {
            return NextResponse.json(
                { error: "Name, phone, and requirement are required fields." },
                { status: 400 }
            );
        }

        const newLead = await Lead.create({
            name,
            phone,
            email,
            address,
            requirement,
            visitDate: visitDate ? new Date(visitDate) : null,
            notes,
            status: "new",
        });

        return NextResponse.json(
            { message: "Booking confirmed successfully!", lead: newLead },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: "An error occurred while confirming booking.", details: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const leads = await Lead.find().sort({ createdAt: -1 });

        return NextResponse.json({ leads }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to fetch leads." },
            { status: 500 }
        );
    }
}
