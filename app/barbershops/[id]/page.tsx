import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./barbershop-info";

interface BarbershopDetailsPagesProps {
    params: any
}

const BarbershopDetailsPages = async ({params}: BarbershopDetailsPagesProps) => {

    if(!params.id) {
        // TODO: redirect to homepage
        return null;
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        }
    })

    if(!barbershop) {
        //TODO: redirect to homepage
        return null;
    }
    return ( 
        <BarbershopInfo barbershop={barbershop} />
     );
}
 
export default BarbershopDetailsPages;