"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetClose, SheetHeader, SheetTitle } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { quickSearchOptions } from "../_constants/search";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const SideMenu = () => {
    const {data} = useSession();

    const handleLogoutClick = () => signOut();

    const handleLoginWithGoogleClick = async () => await signIn("google");
    
    return ( 
        <>
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

                        <div className="flex flex-col">
                            <h2 className="font-bold">{data.user.name}</h2>
                            <p className="text-sm text-gray-400">{data.user.email}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col px-5 py-6 gap-3">
                    <div className="flex items-center gap-2">
                        <UserIcon size={28} />
                        <h2 className="font-bold">Hello, You need to sign in.</h2>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="w-full">
                                <LogInIcon className="mr-2" size={18}/>
                                Sign in
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[80%]">
                            <DialogHeader>
                                <DialogTitle>Sign in into the platform</DialogTitle>
                                <DialogDescription>Sign in using your Google account!</DialogDescription>
                            </DialogHeader>
                            <Button variant="outline" className="gap-2 font-bold" onClick={handleLoginWithGoogleClick}>
                                <Image src="google.svg" width={18} height={18} alt="sign in with google" />
                                Google
                            </Button>
                        </DialogContent>
                    </Dialog>
                </div>
            )}

            <div className="flex flex-col gap-3 px-5 pb-5">
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

            <div className="flex flex-col gap-3 px-5 border-t border-b border-solid py-5">
                {quickSearchOptions.map((option) => (
                    <SheetClose key={option.title} asChild>
                        <Button variant="ghost" className="justify-start gap-2" asChild>
                            <Link href={`/barbershops?service=${option.title}`}>
                                <Image src={option.imageUrl} height={18} width={18} alt={option.title} />
                                {option.title}                               
                            </Link>
                        </Button>
                    </SheetClose>
                ))}
            </div>

            <div className="flex flex-col gap-3 px-5 border-t border-b border-solid py-5">
                <Button variant="secondary" className="gap-2" onClick={handleLogoutClick}>
                    Logout
                    <LogOutIcon />
                </Button>
            </div>
        </>
    );
}
 
export default SideMenu;