import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session: any = await getServerSession(authOptions);
        const userRole = session?.user?.role;

        if (userRole !== "admin" && userRole !== "staff") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { id } = await params;
        const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });

        if (!updatedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product updated", product: updatedProduct }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to update product", details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session: any = await getServerSession(authOptions);
        const userRole = session?.user?.role;

        if (userRole !== "admin") {
            // Only super admin can delete products
            return NextResponse.json({ error: "Unauthorized. Super Admin clearance required to delete." }, { status: 403 });
        }

        const { id } = await params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted forever." }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to delete product", details: error.message }, { status: 500 });
    }
}
