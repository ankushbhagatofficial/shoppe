import { auth } from "@/lib/auth";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "@/components/Footer";

export default async function Home() {
  const session = await auth()

  return (
    <>
      <Navbar session={session} cart={0} />
      <main className="mx-5 md:mx-10">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
