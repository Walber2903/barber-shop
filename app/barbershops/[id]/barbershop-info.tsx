"use client";

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
    barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    }

    return ( 
        <div>
            <div className="h-[250px] w-full relative">
                <div className="justify-between">
                    <Button size="icon" variant="outline" className="z-50 absolute top-6 left-5" onClick={handleBackClick}>
                        <ChevronLeftIcon />
                    </Button>
                    
                    <Button size="icon" variant="outline" className="z-50 absolute top-6 right-5">
                        <MenuIcon />
                    </Button>
                </div>
                <Image alt={barbershop.name} src={barbershop.imageUrl} fill style={{objectFit:"cover"}} className="opacity-75" />
            </div>

            <div className="flex flex-col pt-3 px-5 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold">{barbershop.name}</h1>
                <div className="flex flex-row items-center gap-2 pt-3">
                    <MapPinIcon className="w-4 h-4 text-primary"/> 
                    <p className="text-sm text-white">{barbershop.address}</p>
                </div>
                <div className="flex flex-row items-center gap-2 pt-2">
                    <StarIcon className="w-4 h-4 fill-primary text-primary"/> 
                    <p className="text-sm text-white">4.99 (899 ratings)</p>
                </div>
            </div>

        </div>
    );
}
 
export default BarbershopInfo;