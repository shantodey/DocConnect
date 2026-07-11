import { Button } from "@/components/ui/button";
import { FaCalendarCheck } from "react-icons/fa";
import Image from "next/image";
import doc_one from '../assats/doc-1.png'
import doc_two from '../assats/doc-2.png'

export default function HeroSection() {
  return (
    <section className="container mx-auto px-6 py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900 tracking-tight">
            We help patients <br />
            <span className="text-blue-600">live a healthy,</span> <br />
            longer life.
          </h1>
          
          <p className="text-gray-600 max-w-lg leading-relaxed text-lg">
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below 
            for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum 
            et Malorum" by Cicero are also reproduced in their exact original form.
          </p>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full flex gap-2">
            <FaCalendarCheck /> Request an Appointment
          </Button>

          {/* Stats */}
          <div className="flex gap-12 pt-8">
            <div>
              <h3 className="text-4xl font-bold text-gray-900">30+</h3>
              <p className="text-gray-500 font-medium">Year of Experience</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">15+</h3>
              <p className="text-gray-500 font-medium">Clinic Location</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gray-900">100%</h3>
              <p className="text-gray-500 font-medium">Patient Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Right Images with Next.js Image */}
        <div className="flex gap-4 justify-center lg:justify-end">
          <div className="relative bg-orange-200 w-64 h-80 rounded-3xl overflow-hidden shadow-lg">
            <Image  src={doc_one} alt="Doctor 1"  fill  className="object-cover" sizes="(max-width: 768px) 100vw, 256px"/>
          </div>
          <div className="relative bg-purple-500 w-64 h-80 rounded-3xl mt-12 overflow-hidden shadow-lg">
            <Image  src={doc_two}  alt="Doctor 2"  fill  className="object-cover" sizes="(max-width: 768px) 100vw, 256px"/>
          </div>
        </div>
      </div>
    </section>
  );
}