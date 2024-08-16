import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { db } from "./_lib/prisma";
import Image from "next/image";

const Home = async () => {
  // const barbershops = await db.barbershop.findMany({})
  // console.log({barbershops})
  return (
    <div>
      <Header />
      <div className="flex flex-col p-5">
        <h2 className="text-xl font-bold">Hello, Walber!</h2>
        <p>Friday, 16 August</p>
      </div>

      <div className="flex flex-row gap-2 px-5">
        <Input placeholder="Make your search..." />
        <Button>
          <SearchIcon />
        </Button>
      </div>

      <div className="relative w-full h-[150px]">
        <Image alt="banner to click and book a barber" src="/banner-book-barber.png" fill className="object-cover  p-5"/>
      </div>

      <div className="p-5">
        <h3>Appointments</h3>
      </div>
    </div>
  );
}

export default Home