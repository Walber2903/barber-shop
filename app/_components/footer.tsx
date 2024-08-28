import { Card, CardContent } from "./ui/card";

const Footer = () => {
    return ( 
    <footer className="pt-6">
        <Card>
            <CardContent className="px-5 py-6">
                <p className="text-sm font-bold text-gray-400">© 2024 Copyright Walber Menezes</p>
            </CardContent>
        </Card>
    </footer>        
     );
}
 
export default Footer