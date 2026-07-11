"use client";

import React from 'react';
import Image from 'next/image';
import { FaStar, FaArrowRight } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// TypeScript Interface for Doctor Data
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  patientsCount: string;
  hospital: string;
  imageBgColor: string;
  imageSrc: string;
}

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "kaif Akhtar",
    specialty: "Surgeon",
    rating: 4.8,
    reviewsCount: 272,
    patientsCount: "+1500 patients",
    hospital: "At Mount Adora Hospital, Sylhet.",
    imageBgColor: "bg-[#4ade80]", // Green background
    imageSrc: "/doctor1.png" // Replace with your image paths
  },
  {
    id: 2,
    name: "Dr. Mohsin Khan",
    specialty: "Neurologist",
    rating: 4.8,
    reviewsCount: 272,
    patientsCount: "+1500 patients",
    hospital: "At Mount Adora Hospital, Sylhet.",
    imageBgColor: "bg-[#a855f7]", // Purple background
    imageSrc: "/doctor2.png"
  },
  {
    id: 3,
    name: "Dr. Vikash Trivedi",
    specialty: "Dermatologist",
    rating: 4.8,
    reviewsCount: 272,
    patientsCount: "+1500 patients",
    hospital: "At Mount Adora Hospital, Sylhet.",
    imageBgColor: "bg-[#f9a8d4] sm:bg-[#fbcfe8] lg:bg-[#fca5a5] bg-[#ffaa6d]", // Soft Orange/Peach background
    imageSrc: "/doctor3.png"
  },
  // You can add more doctors here to test the slider
];

export default function DoctorsSection() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Our great doctors
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-normal leading-relaxed">
            World class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>

        {/* Swiper Slider Wrapper */}
        <div className="w-full pb-12">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="doctors-swiper"
          >
            {doctorsData.map((doctor) => (
              <SwiperSlide key={doctor.id}>
                <div className="flex flex-col bg-white rounded-3xl overflow-hidden p-2 select-none">
                  
                  {/* Doctor Image Container with Dynamic Background Color */}
                  <div className={`relative w-full aspect-square ${doctor.imageBgColor} rounded-[40px] overflow-hidden flex items-end justify-center`}>
                    <Image
                      src={doctor.imageSrc}
                      alt={doctor.name}
                      width={400}
                      height={400}
                      className="object-cover object-bottom w-[90%] h-[90%]"
                    />
                  </div>

                  {/* Doctor Info Details */}
                  <div className="pt-6 pb-2 px-2 space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900 capitalize">
                      {doctor.name}
                    </h3>

                    {/* Tag & Rating Row */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-[#D2F4F8] text-[#1FA6B8] text-xs font-bold px-4 py-2 rounded-lg">
                        {doctor.specialty}
                      </span>
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                        <FaStar className="text-amber-400" />
                        <span>{doctor.rating}</span>
                        <span className="text-slate-400 font-medium">({doctor.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Bottom Row: Patients, Hospital and Action Button */}
                    <div className="flex items-end justify-between gap-4 pt-2">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900">
                          {doctor.patientsCount}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">
                          {doctor.hospital}
                        </p>
                      </div>

                      {/* Circle Arrow Icon Button */}
                      <button 
                        className="w-11 h-11 rounded-full border border-slate-900 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 shrink-0"
                        aria-label={`View profile of ${doctor.name}`}
                      >
                        <FaArrowRight className="text-sm" />
                      </button>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>

      {/* Optional Swiper Pagination Bullet Styling Overrides */}
      <style jsx global>{`
        .doctors-swiper .swiper-pagination-bullet-active {
          background: #000000 !important;
          width: 10px;
          height: 10px;
        }
      `}</style>
    </section>
  );
}