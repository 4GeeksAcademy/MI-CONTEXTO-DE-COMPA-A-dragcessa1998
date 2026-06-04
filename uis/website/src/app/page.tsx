import Hero from "@/components/website/Hero";
import Services from "@/components/website/Services";
import WhyNexova from "@/components/website/WhyNexova";
import Contact from "@/components/website/Contact";

/** Landing corporativa: compone las secciones del Hito 1 como componentes React. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyNexova />
      <Contact />
    </>
  );
}
