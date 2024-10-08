"use client";

import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BarbershopItemsProps {
    barbershop: Barbershop;
}

const BarbershopItems = ({ barbershop }: BarbershopItemsProps) => {
    const router = useRouter();

    const handleBookingClick = () => {
        console.log('Booking button clicked')
        router.push(`/barbershops/${barbershop.id}`);
    }

    return ( 
        <Card className="min-w-[170px] rounded-2xl">
            <CardContent className="px-1 pt-1 pb-3">
                <div className="relative h-[110px] w-full">
                    <Image alt={barbershop.name} fill className="object-cover rounded-2xl" src={barbershop.imageUrl} />
                    <Badge className="absolute left-2 top-2 gap-1" variant="secondary">
                        <StarIcon size={12} className="fill-primary text-primary"/>
                        <p className="text-xs font-semibold">5.0</p>
                    </Badge>
                </div>
                <div className="px-2 py-3">
                    <h3 className="font-semibold truncate">{barbershop?.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{barbershop?.address}</p>
                    <Button variant="secondary" className="w-full mt-3" onClick={handleBookingClick}>Book</Button>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default BarbershopItems;