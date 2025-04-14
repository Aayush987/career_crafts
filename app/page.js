"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Extra from "./_components/Extra";
import Footer from "./_components/Footer";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  return (
   <div className="flex min-h-screen flex-col m-1">
     <Header />
     <main className="flex-1">
      <Hero />
      <Features />
      <Extra />
     </main>
     {/* <Footer /> */}
   </div>
  );
}
