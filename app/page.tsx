import Header from "./_components/header";
import { db } from "./_lib/prisma";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  console.log({barbershops})
  return (
    <div>
      <Header />

    </div>
  );
}

export default Home