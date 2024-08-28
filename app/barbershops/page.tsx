import BarbershopItems from "../_components/barbershop-items";
import Header from "../_components/header";
import Search from "../_components/search";
import { db } from "../_lib/prisma";

interface BarberShopPageProps {
    searchParams: {
        search?: string
    }
}

const BarberShopsPage = async ({ searchParams }: BarberShopPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams?.search,
                mode: "insensitive",
            },
        },
    })

    return (
        <div>
            <Header />
            <div className="my-6 px-5">
                <Search />
            </div>
            <div className="px-5">
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Results to &quot;{searchParams?.search}&quot;</h2>
                <div className="grid grid-cols-2 gap-4">
                    {barbershops.map((barbershop) => (
                        <BarbershopItems key={barbershop.id} barbershop={barbershop} />
                    ))}
                </div>
            </div>
        </div>
    )
}
 
export default BarberShopsPage;