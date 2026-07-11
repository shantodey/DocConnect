import React from 'react';
import Image from 'next/image';
import { FaVideo } from 'react-icons/fa6';
import { Button } from '@/components/ui/button'; 
import Doc_three from '../assats/doc-3.jpg'; 


export default function HeroSection() {
  return (
    <section className="w-full min-h-screen flex items-center bg-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text & Content */}
        <div className="space-y-8 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Get Virtual Treatment <br className="hidden sm:inline" /> anytime.
          </h1>
          
          <ol className="space-y-6 text-base md:text-lg text-slate-600 font-medium">
            <li className="flex items-start gap-3">
              <span className="font-semibold text-slate-800">1.</span>
              <span>Schedule the appointment directly.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-slate-800">2.</span>
              <span>Search for your Physician here, and contact their office.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-slate-800">3.</span>
              <span>
                View your Physician who are accepting new patient, use the online scheduling tool to select an appointment time.
              </span>
            </li>
          </ol>

          <div className="pt-4">
            {/* Shadcn UI Button wrapper */}
            <Button 
              className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-6 text-base font-semibold rounded-full shadow-lg transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Side: Image and Floating Card */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Main Container with Yellow Background */}
          <div className="relative w-full max-w-[450px] aspect-[4/5] bg-[#FFD043] rounded-[32px] overflow-visible shadow-sm">
            
            {/* Background Circle Decorative Accents */}
            <div className="absolute top-10 right-10 w-16 h-16 bg-[#FFE17D] rounded-full opacity-70" />
            <div className="absolute top-1/3 left-8 w-12 h-12 bg-[#FFE17D] rounded-full opacity-70" />
            
            {/* Doctor Image */}
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden rounded-[32px]">
              <Image
                src={Doc_three} // Replace with your actual doctor image path in public/ folder
                alt="Doctor"
                width={450}
                height={560}
                priority
                className="object-cover object-bottom w-full h-full"
              />
            </div>

            {/* Floating Consultation Card */}
            <div className="absolute bottom-20 -left-6 md:-left-12 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 min-w-[260px] animate-fade-in">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                  <span>Tue, 24</span>
                  <span className="text-slate-400 font-medium">10:00AM</span>
                </div>
                
                <div className="inline-block bg-[#E0F4F7] text-[#2C93A6] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  Consultation
                </div>
                
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                    <Image  src="/avatar.png"  alt="Naif Farooqui"  width={24}  height={24}/>
                  </div>
                  <span className="text-xs font-bold text-slate-800">Naif Farooqui</span>
                </div>
              </div>

              {/* Orange Video Icon Box */}
              <div className="w-12 h-12 bg-[#FFB000] rounded-xl flex items-center justify-center text-white text-xl shadow-md shadow-orange-200">
                <FaVideo />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}