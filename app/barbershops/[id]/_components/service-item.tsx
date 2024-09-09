"use client";

import { createBooking } from "@/app/_actions/create-booking";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, BarbershopService } from "@prisma/client";
import { format, setHours, setMinutes } from "date-fns";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, "name">
    isAuthenticated?: boolean
}

const TIME_LIST = [
    "09:00",
    "09:45",
    "10:30",
    "11:15",
    "12:00",
    "12:45",
    "13:30",
    "14:15",
    "15:00",
    "15:45",
    "16:30",
    "17:15",
    "18:00",
    "18:45"
]

const ServiceItem = ({service, barbershop, isAuthenticated}: ServiceItemProps) => {
    const {data} = useSession()
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<String | undefined>(undefined)

    const handleDaySelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleSelectedTime = (time: string) => {
        setSelectedTime(time)
    }

    const handleCreateBooking = async () => {
        try {
            if (!selectedDay || !selectedTime) return;

            const hours = selectedTime.split(":")[0]
            const minutes = selectedTime.split(":")[1]

            const dateWithNewMinutes = setMinutes(selectedDay, Number(minutes))
            const dateWithHours = setHours(dateWithNewMinutes, Number(hours))

            await createBooking({
                serviceId: service.id,
                userId: (data?.user as any).id,
                date: dateWithHours,
            })
            toast.success("Successfuly reservation")
        } catch (error) {
            console.error(error)
            toast.error("Error to confirming reservation")
        }
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
                                            <Button onClick={handleCreateBooking} disabled={!selectedDay || !selectedTime}>Confirm</Button>
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