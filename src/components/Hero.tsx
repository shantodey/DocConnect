import { Button } from "@/components/ui/button";
import { FaCalendarCheck } from "react-icons/fa";
import Image from "next/image";
import doc_one from '../assats/doc-1.png'
import doc_two from '../assats/doc-2.png'
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-6 py-12 sm:py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 tracking-tight">
            We help patients <br />
            <span className="text-blue-600">live a healthy,</span> <br />
            longer life.
          </h1>

          <p className="text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed text-base sm:text-lg">
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
            for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum
            et Malorum" by Cicero are also reproduced in their exact original form.
          </p>

          <Button render={
            <Link className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full inline-flex gap-2" href={'/doctors'}>
              <FaCalendarCheck /> Request an Appointment
            </Link>
          }>
          </Button>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12 pt-6 sm:pt-8">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">30+</h3>
              <p className="text-gray-500 font-medium text-sm sm:text-base">Year of Experience</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">15+</h3>
              <p className="text-gray-500 font-medium text-sm sm:text-base">Clinic Location</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">100%</h3>
              <p className="text-gray-500 font-medium text-sm sm:text-base">Patient Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className="flex gap-3 sm:gap-4 justify-center lg:justify-end">
          <div className="relative bg-orange-200 w-40 h-56 sm:w-56 sm:h-72 lg:w-64 lg:h-80 rounded-3xl overflow-hidden shadow-lg">
            <Image src={doc_one} alt="Doctor 1" fill className="object-cover" sizes="(max-width: 768px) 40vw, 256px" />
          </div>
          <div className="relative bg-purple-500 w-40 h-56 sm:w-56 sm:h-72 lg:w-64 lg:h-80 rounded-3xl mt-8 sm:mt-12 overflow-hidden shadow-lg">
            <Image src={doc_two} alt="Doctor 2" fill className="object-cover" sizes="(max-width: 768px) 40vw, 256px" />
          </div>
        </div>
      </div>
    </section>
  );
}