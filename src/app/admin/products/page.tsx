
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import ProductList from "@/components/ProductList";

export const metadata = {
    title: "Products | Admin Panel",
};

export default async function ProductsPage() {
    await dbConnect();

    // Fetch with explicit Lean to avoid circular structure issues in serialization
    const data = await Product.find().sort({ createdAt: -1 }).lean();

    const products = data.map((item: any) => ({
        ...item,
        _id: item._id.toString(),
        createdAt: item.createdAt ? item.createdAt.toISOString() : null,
        updatedAt: item.updatedAt ? item.updatedAt.toISOString() : null,
    }));

    return (
        <div>
            <ProductList initialProducts={products} />
        </div>
    );
}
