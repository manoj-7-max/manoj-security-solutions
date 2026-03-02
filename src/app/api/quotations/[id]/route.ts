import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Quotation from "@/models/Quotation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const body = await req.json();
        const updated = await Quotation.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Quotation not found" }, { status: 404 });

        return NextResponse.json({ message: "Quotation updated", quotation: updated });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const quotation = await Quotation.findById(id);
        if (!quotation) return NextResponse.json({ error: "Quotation not found" }, { status: 404 });

        return NextResponse.json({ quotation });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
