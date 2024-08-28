"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { BarbershopService } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface ServiceItemProps {
    service: BarbershopService
    isAuthenticated?: boolean
}

const ServiceItem = ({service, isAuthenticated}: ServiceItemProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn("google");
        }

        //TODO open booking modal
    }

    return ( 
        <Card>
            <CardContent className="p-3">
                <div className="flex gap-4 items-center">
                    <div className="relative min-h-[100px] min-w-[110px] max-h-[100px] max-w-[110px]">
                        <Image className="rounded-lg object-cover" src={service.imageUrl} fill alt={service.name} />
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-bold capitalize">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-primary text-sm font-bold">
                                {Intl.NumberFormat("en-CA", {
                                    style: "currency",
                                    currency: "CAD",
                                }).format(Number(service.price))}
                            </p>
                            <Sheet>
                                <SheetTrigger>
                                    <Button className="text-secondary" size="sm" onClick={handleBookingClick}>
                                        Book
                                    </Button>
                                </SheetTrigger>

                                <SheetContent className="p-0">
                                    <SheetHeader className="px-5 py-6 border-b border-solid border-secondary">
                                        <SheetTitle>Make an appointment</SheetTitle>
                                    </SheetHeader>

                                    <div className="border-b border-solid py-5">
                                        <Calendar 
                                            mode="single"
                                            selected={date}
                                            className="rounded-md border"
                                            onSelect={setDate}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                },
                                            }}
                                        />
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default ServiceItem;