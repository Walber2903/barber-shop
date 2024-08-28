"use client"

import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemProps {
    phone: string
}

const PhoneItem = ({phone} : PhoneItemProps) => {
    const handleCopyPhoneClick = (phone: string) => {
        console.log(navigator.clipboard.writeText(phone))
        toast.success("Phone copied successfully")
    }

    return ( 
        <div className="flex justify-between" key={phone}>
           {/* left */}
            <div className="flex items-center gap-2">
                <SmartphoneIcon />
                <p className="text-sm">{phone}</p>
            </div>
            {/* right */}
            <Button variant="outline" size="sm" onClick={() => handleCopyPhoneClick(phone)}>Copy</Button>
        </div>
     );
}
 
export default PhoneItem;