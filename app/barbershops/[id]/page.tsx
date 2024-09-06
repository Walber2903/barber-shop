import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PhoneItem from "@/app/_components/phone-item";

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
                <h2 className="text-xs font-bold uppercase text-gray-400">Services:</h2>
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} barbershop={barbershop} service={service} />
                ))}
            </div>

            <div className="p-5 space-y-3">
                {barbershop.phones.map((phone) => (
                    <PhoneItem key={phone} phone={phone} />
                ))}
            </div>
        </div>
     );
}
 
export default BarbershopDetailsPages;