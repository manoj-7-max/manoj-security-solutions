
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import ServiceList from "@/components/ServiceList";

export const metadata = {
    title: "Services | Admin Panel",
};

export default async function ServicesPage() {
    await dbConnect();

    const rawServices = await Service.find().sort({ name: 1 }).lean();

    const services = rawServices.map((s: any) => ({
        ...s,
        _id: s._id.toString(),
        features: s.features || [],
    }));

    return <ServiceList initialServices={services} />;
}
