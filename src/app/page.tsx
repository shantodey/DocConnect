import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ServicesSection from "@/components/ServicesSection";
import VirtualTreatment from "@/components/VirtualTreatment";


export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ServicesGrid/>
      <VirtualTreatment/>
    </>
  );
}
