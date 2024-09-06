"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, BarbershopService } from "@prisma/client";
import { format } from "date-fns";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, "name">
    isAuthenticated?: boolean
}

const TIME_LIST = [
    "09:00 AM",
    "09:45 AM",
    "10:30 AM",
    "11:15 AM",
    "12:00 PM",
    "12:45 PM",
    "01:30 PM",
    "02:15 PM",
    "03:00 PM",
    "03:45 PM",
    "04:30 PM",
    "05:15 PM",
    "06:00 PM",
    "06:45 PM"
]

const ServiceItem = ({service, barbershop, isAuthenticated}: ServiceItemProps) => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<String | undefined>(undefined)

    const handleDaySelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleSelectedTime = (time: string) => {
        setSelectedTime(time)
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
                                    <Button className="text-secondary" size="sm" type="button">
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
                                            selected={selectedDay}
                                            onSelect={handleDaySelect}
                                            className="rounded-md border"
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

                                    {selectedDay && (
                                        <div className="p-5 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden border-b border-solid">
                                            {TIME_LIST.map(time => (
                                                <Button key={time} variant={selectedTime === time? "default" : "outline"} className="rounded-full" onClick={() => handleSelectedTime(time)}>
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                    )}

                                    {selectedTime && selectedDay && (
                                        <div className="p-5">
                                            <Card>
                                                <CardContent className="p-3 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="font-bold capitalize">{service.name}</h2>
                                                        <p className="text-sm font-bold">{Intl.NumberFormat("en-CA", {style: 'currency', currency: 'CAD'}).format(Number(service.price))}</p>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm capitalize text-gray-400">Date</h2>
                                                        <p className="text-sm font-bold text-gray-400">{format(selectedDay, "MMMM d")}</p>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm capitalize text-gray-400">Time</h2>
                                                        <p className="text-sm font-bold text-gray-400">{selectedTime}</p>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm capitalize text-gray-400">Barber</h2>
                                                        <p className="text-sm font-bold text-gray-400">{barbershop.name}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}

                                    <SheetFooter className="px-5">
                                        <SheetClose asChild>
                                            <Button type="submit">Confirm</Button>
                                        </SheetClose>
                                    </SheetFooter>
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