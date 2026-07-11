import Image from "next/image";
import { Button } from "@/components/ui/button";
import doctorImg from "../assats/doctor-profile.jpg"; 

export default function AboutSection() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative">
          <div className="bg-orange-500 w-full max-w-lg h-[450px] rounded-3xl overflow-hidden relative">
            <Image 
              src={doctorImg} 
              alt="Dr. Mitchell Starc" 
              fill 
              className="object-cover"
            />
          </div>
          
          {/* Floating Info Card */}
          <div className="absolute -bottom-10 right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image src={doctorImg} alt="Doctor" fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Dr. Mitchell Starc</h4>
              <p className="text-xs text-gray-500">Chief Doctor of Nursing</p>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Proud to be one of the nations best
          </h2>
          
          <p className="text-gray-600 leading-relaxed">
            Meet Dr. Mitchell Starc, a compassionate healer dedicated to restoring health 
            and well-being. With 8 years of experience in orthopedic, Dr. Mitchell Starc 
            offers personalized care and expertise to every patient. Trust in Dr. Mitchell 
            Starc for comprehensive medical solutions tailored to your needs.
          </p>
          
          <p className="text-gray-600 leading-relaxed">
            Our best is something we strive for each day, caring for our patient-not 
            looking back at what we accomplished but towards what we can do tomorrow. 
            Providing the best. Expert in Orthopedic. Compassionate care provider. 
            Personalized treatment approach.
          </p>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg rounded-full">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}