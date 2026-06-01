import { auth } from "@/lib/auth";
import Navbar from "./components/Navbar";

export default async function Home() {
  const session = await auth()

  return (
    <>
      <Navbar session={session} cart={0} />
    </>
  );
}
