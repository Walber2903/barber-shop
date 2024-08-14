import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return ( 
        <Card>
            <CardContent>
                <Image alt="barber logo" src="/logo.png" height={18} width={120}/>
                <Button>
                    <MenuIcon />
                </Button>
            </CardContent>
        </Card>
    );
}
 
export default Header;