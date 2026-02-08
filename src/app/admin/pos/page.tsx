
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import PointOfSale from "@/components/PointOfSale";

export const metadata = {
    title: "POS System | Manoj Security Solutions",
};

export default async function POSPage() {
    await dbConnect();

    const rawProducts = await Product.find().sort({ name: 1 }).lean();

    const products = rawProducts.map((p: any) => ({
        _id: p._id.toString(),
        name: p.name,
        price: p.price,
        category: p.category,
        image: p.image || null,
        icon: p.icon || null,
    }));

    return <PointOfSale products={products} />;
}
