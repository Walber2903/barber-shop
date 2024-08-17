import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { db } from "./_lib/prisma";
import Image from "next/image";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { Card, CardContent } from "./_components/ui/card";

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
        <Card className="mt-6">
          <CardContent className="flex py-5 justify-between">
            <div className="flex flex-col gap-2"> 
              <Badge className="w-fit">Confirmed</Badge>
              <h3 className="font-semibold">Hair cut</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png"/>
                </Avatar>
                <p className="text-sm">Vintage barber</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid pl-5">
              <p className="text-sm">August</p>
              <p className="text-2xl">14</p>
              <p className="text-sm">4:00pm</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home