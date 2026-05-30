"use client"

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const session  = useSession()
  useEffect(() => {
    console.log(session.data?.user);
  }, [session])

  return (
    <>
      <Navbar />
    </>
  );
}
