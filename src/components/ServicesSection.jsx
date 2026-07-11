import Image from "next/image";

import { FaArrowRightLong } from "react-icons/fa6";
import findDoctorImg from "../assats/Find a doctor.png";
import findLocationImg from "../assats/Find location.png";
import bookAppointmentImg from "../assats/Book appointment.png";
const services = [
  {
    title: "Find a Doctor",
    description: "World-class care for everyone. Our health System offers unmatched, expert health care.",
    image: findDoctorImg,
  },
  {
    title: "Find a Location",
    description: "World-class care for everyone. Our health System offers unmatched, expert health care.",
    image: findLocationImg,
  },
  {
    title: "Book Appointment",
    description: "World-class care for everyone. Our health System offers unmatched, expert health care.",
    image: bookAppointmentImg,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Providing the best medical services</h2>
          <p className="text-gray-600">World-class care for everyone. Our health System offers unmatched, expert health care.</p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center p-8 transition-all hover:shadow-lg rounded-2xl border border-transparent hover:border-gray-100">
              {/* Image Container */}
              <div className="relative w-48 h-48 mb-6">
                <Image  src={service.image}  alt={service.title}  fill  className="object-contain"/>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-500 mb-6 leading-relaxed">{service.description}</p>
              
              {/* Arrow Button */}
              <button className="p-3 rounded-full border border-gray-300 hover:bg-blue-600 hover:text-white transition-colors">
                <FaArrowRightLong size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}