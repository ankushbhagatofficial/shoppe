import { auth } from "@/lib/auth";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default async function Home() {
  const session = await auth()

  return (
    <>
      <Navbar session={session} cart={0} />
      <main className="px-5 md:mx-10">
        <Hero />
      </main>
    </>
  );
}
