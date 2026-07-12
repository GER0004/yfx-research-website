import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import About from "@/components/sections/About";

const Solutions = dynamic(() => import("@/components/sections/Solutions"));
const Technology = dynamic(() => import("@/components/sections/Technology"));
const Performance = dynamic(() => import("@/components/sections/Performance"));
const Platform = dynamic(() => import("@/components/sections/Platform"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Ecosystem = dynamic(() => import("@/components/sections/Ecosystem"));
const CTA = dynamic(() => import("@/components/sections/CTA"));
const EarlyAccess = dynamic(() => import("@/components/sections/EarlyAccess"));

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partners />
        <About />
        <Solutions />
        <Technology />
        <Performance />
        <Platform />
        <Process />
        <Ecosystem />
        <CTA />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
