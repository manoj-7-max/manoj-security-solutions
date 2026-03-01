import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Lead from "@/models/Lead";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();

        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Lead ID is required." }, { status: 400 });
        }

        const body = await req.json();
        const updatedLead = await Lead.findByIdAndUpdate(id, body, { new: true });

        if (!updatedLead) {
            return NextResponse.json({ error: "Lead not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Lead updated", lead: updatedLead }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to update lead.", details: error.message }, { status: 500 });
    }
}
