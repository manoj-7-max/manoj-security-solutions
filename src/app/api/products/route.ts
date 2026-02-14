
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import Product from '@/models/Product';
import dbConnect from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'staff')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const data = await req.formData();

        const name = data.get('name') as string;
        const category = data.get('category') as string;
        const description = data.get('description') as string;
        const price = data.get('price') as string;
        const icon = data.get('icon') as string;
        const stock = parseInt(data.get('stock') as string) || 0;

        const file: File | null = data.get('image') as unknown as File;
        let imagePath = '';

        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = join(process.cwd(), 'public/uploads');
            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (e) {
                // exists
            }

            const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
            const path = join(uploadDir, fileName);

            await writeFile(path, buffer);
            imagePath = `/uploads/${fileName}`;
        }

        const product = await Product.create({
            name,
            category,
            description,
            price,
            icon,
            stock,
            image: imagePath || null,
        });

        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
