import AboutSection from "@/components/AboutSection";
import DoctorsSection from "@/components/DoctorsSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import PatientFAQSection from "@/components/PatientFAQSection";
import ServicesGrid from "@/components/ServicesGrid";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VirtualTreatment from "@/components/VirtualTreatment";


export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ServicesGrid/>
      <VirtualTreatment/>
      <DoctorsSection/>
      <PatientFAQSection/>
      <TestimonialsSection/>
      <Footer/>
    </>
  );
}
