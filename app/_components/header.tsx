"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
    const {data, status} = useSession();

    const handleLogoutClick = () => signOut();

    const handleLoginClick = () => signIn();

    return ( 
        <Card>
            <CardContent className="flex justify-between items-center flex-row p-5">
                <Image alt="barber logo" src="/logo.png" height={18} width={120}/>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                            <SheetTitle>
                                Menu
                            </SheetTitle>
                        </SheetHeader>

                        {data?.user ? (
                            <div className="flex justify-between px-5 py-6 items-center">
                                <div className="flex items-center gap-3 px-5 py-6">
                                    <Avatar>
                                        <AvatarImage src={data.user.image ?? ""} />
                                    </Avatar>

                                    <h2 className="font-bold">{data.user.name}</h2>
                                </div>

                                <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
                                    <LogOutIcon />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col px-5 py-6 gap-3">
                                <div className="flex items-center gap-2">
                                    <UserIcon size={28} />
                                    <h2 className="font-bold">Hello, You need to login.</h2>
                                </div>

                                <Button variant="secondary" className="w-full" onClick={handleLoginClick}>
                                    <LogInIcon className="mr-2" size={18}/>
                                    Login
                                </Button>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 px-5">
                            <Button variant="outline" className="justify-start" asChild>
                                <Link href="/">
                                    <HomeIcon size={18} className="mr-2"/>
                                    Home                               
                                </Link>
                            </Button>

                            {data?.user && (
                                <Button variant="outline" className="justify-start" asChild>
                                    <Link href="/appointments">
                                        <CalendarIcon size={18} className="mr-2"/>
                                        Appointments
                                    </Link>
                                </Button>                                
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}
 
export default Header;