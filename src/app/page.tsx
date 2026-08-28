import Hero from "@/components/hero";
import Services from "@/components/services";
import Solutions from "@/components/solutions";
import Sectors from "@/components/sectors";
import Studio from "@/components/studio";
import Process from "@/components/process";
import Proof from "@/components/proof";
import Voices from "@/components/voices";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main id="main" className="relative">
      <Hero />
      <Services />
      <Solutions />
      <Sectors />
      <Studio />
      <Process />
      <Proof />
      <Voices />
      <Contact />
    </main>
  );
}
