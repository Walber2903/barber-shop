import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const AppointmentItem = () => {
    return ( 
        <>
            <h3 className="text-gray-400 font-xs font-bold uppercase">Appointments</h3>
            <Card className="mt-3">
            <CardContent className="flex py-5 justify-between">
                <div className="flex flex-col gap-2"> 
                    <Badge className="w-fit">Confirmed</Badge>
                    <h3 className="font-semibold">Hair cut</h3>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src="https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png"/>
                        </Avatar>
                        <p className="text-sm">Vintage barber</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center border-l-2 border-solid pl-5">
                    <p className="text-sm">August</p>
                    <p className="text-2xl">14</p>
                    <p className="text-sm">4:00pm</p>
                </div>
            </CardContent>
            </Card>
        </>
     );
}
 
export default AppointmentItem;