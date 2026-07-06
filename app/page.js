import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import About from "@/components/sections/About";
import Solutions from "@/components/sections/Solutions";
import Technology from "@/components/sections/Technology";
import Performance from "@/components/sections/Performance";
import Platform from "@/components/sections/Platform";
import Process from "@/components/sections/Process";
import Ecosystem from "@/components/sections/Ecosystem";
import CTA from "@/components/sections/CTA";
import EarlyAccess from "@/components/sections/EarlyAccess";

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
