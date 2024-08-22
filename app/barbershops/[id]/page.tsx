import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { Card, CardContent } from "@/app/_components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarbershopDetailsPagesProps {
    params: any
}

const BarbershopDetailsPages = async ({params}: BarbershopDetailsPagesProps) => {
    const session = await getServerSession(authOptions);

    if(!params.id) {
        // TODO: redirect to homepage
        return null;
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        },
    })

    if(!barbershop) {
        //TODO: redirect to homepage
        return null;
    }
    return ( 
        <div>
            <BarbershopInfo barbershop={barbershop} />
    
            <div className="px-5 flex flex-col gap-4 py-6">
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                ))}
            </div>

            <footer className="pt-6">
                <Card>
                    <CardContent className="px-5 py-6">
                        <p className="text-sm font-bold text-gray-400">© 2024 Copyright Walber Menezes</p>
                    </CardContent>
                </Card>
            </footer>
        </div>
     );
}
 
export default BarbershopDetailsPages;