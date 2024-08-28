import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { db } from "./_lib/prisma";
import Image from "next/image";
import BarbershopItems from "./_components/barbershop-items";
import { quickSearchOptions } from "./_constants/search"
import AppointmentItem from "./_components/appointments";
import Search from "./_components/search";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    }
  })

  return (
    <div>
      <Header />
      <div className="flex flex-col p-5">
        <h2 className="text-xl font-bold">Hello, Walber!</h2>
        <p>Friday, 16 August</p>
      </div>

      <div className="px-5">
        <Search />
      </div>

      <div className="flex p-5 gap-3 pt-6 overflow-x-auto [&:: -`webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => (
          <Button key={option.title} className="gap-2">
            <Image width={16} height={16} alt={option.title} src={option.imageUrl}/>
            {option.title}
          </Button>
        ))}
      </div>

      <div className="relative w-full h-[150px]">
        <Image alt="banner to click and book a barber" src="/banner-book-barber.png" fill className="object-cover  p-5"/>
      </div>

      <div className="p-5">
        <AppointmentItem />
      </div>

      <div className="p-5">
        <h3 className="text-gray-400 font-xs font-bold uppercase">Recomendations</h3>
      </div>
      <div className="flex flex-row gap-4 px-5 overflow-auto [&:: -webkit-scrollbar]:hidden"> 
        {barbershops.map((barbershop) => (
          <BarbershopItems key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>  

      <div className="p-5">
        <h3 className="text-gray-400 font-xs font-bold uppercase">Popular</h3>
      </div>
      <div className="flex flex-row gap-4 px-5 overflow-auto [&:: -webkit-scrollbar]:hidden"> 
        {popularBarbershops.map((popularBarbershop) => (
          <BarbershopItems key={popularBarbershop.id} barbershop={popularBarbershop} />
        ))}
      </div>  
    </div>
  );
}

export default Home