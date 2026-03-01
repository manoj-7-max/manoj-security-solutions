import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
    try {
        await dbConnect();
        const products = await Product.find().sort({ createdAt: -1 });
        return NextResponse.json({ products }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();

        // Security check - super admin and staff can add products
        const session: any = await getServerSession(authOptions);
        const userRole = session?.user?.role;

        if (userRole !== "admin" && userRole !== "staff") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { name, category, basePrice, stock, image } = body;

        if (!name || !category || !basePrice) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newProduct = await Product.create({
            name,
            category,
            basePrice,
            stock: stock || 0,
            image,
        });

        return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to create product", details: error.message }, { status: 500 });
    }
}
