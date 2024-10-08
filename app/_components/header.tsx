"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";

const Header = () => {
    return ( 
        <Card>
            <CardContent className="flex justify-between items-center flex-row p-5">
                <Link href="/">
                    <Image alt="barber logo" src="/logo.png" height={18} width={120}/>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SideMenu />
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}
 
export default Header;