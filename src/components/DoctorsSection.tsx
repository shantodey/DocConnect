"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaStar, FaArrowRight } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';



import 'swiper/css';
import 'swiper/css/pagination';
import { getRandomDoctors } from '../../server/serverAction';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  fee?: number;
  patientCount?: number;
  rating?: number;
  image?: string;
}

const bgColors = ["bg-[#4ade80]", "bg-[#a855f7]", "bg-[#ffaa6d]", "bg-[#fca5a5]"];

export default function DoctorsSection() {
  const [doctorsData, setDoctorsData] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const data = await getRandomDoctors(7);
        if (data && Array.isArray(data)) {
          setDoctorsData(data);
        }
      } catch (error) {
        console.error("Error loading doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-white py-16 text-center text-slate-500 font-medium">
        Loading amazing doctors...
      </div>
    );
  }

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

        <div className="w-full pb-12">
          {doctorsData.length > 0 ? (
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
              {doctorsData.map((doctor, index) => {
                const randomBg = bgColors[index % bgColors.length];

                return (
                  <SwiperSlide key={doctor._id}>
                    <div className="flex flex-col bg-white rounded-3xl overflow-hidden p-2 select-none">

                      <div className={`  ${randomBg} relative w-full aspect-square rounded-[40px] overflow-hidden flex items-end justify-center`} >
                        <Image src={doctor.image!} alt={doctor.name} fill className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      </div>

                      {/* Doctor Info Details */}
                      <div className="pt-6 pb-2 px-2 space-y-4">
                        <h3 className="text-2xl font-bold text-slate-900 capitalize truncate">
                          {doctor.name}
                        </h3>

                        {/* Tag & Rating Row */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="bg-[#D2F4F8] text-[#1FA6B8] text-xs font-bold px-4 py-2 rounded-lg truncate">
                            {doctor.specialization || "General Physician"}
                          </span>
                          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 shrink-0">
                            <FaStar className="text-amber-400" />
                            <span>{doctor.rating}</span>
                            <span className="text-slate-400 font-medium">(272)</span>
                          </div>
                        </div>

                        {/* Bottom Row: Patients, Hospital and Action Button */}
                        <div className="flex items-end justify-between gap-4 pt-2">
                          <div className="space-y-1 min-w-0">
                            <h4 className="text-sm font-bold text-slate-900">
                              +{doctor.patientCount}patients
                            </h4>
                            <p className="text-xs text-slate-400 font-medium truncate">
                              {doctor.fee ? `Fee: $${doctor.fee}` : "At Mount Adora Hospital, Sylhet."}
                            </p>
                          </div>

                          {/* Link to Detail Page */}
                          <Link
                            href={`/doctors/${doctor._id}`}
                            className="w-11 h-11 rounded-full border border-slate-900 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 shrink-0"
                            aria-label={`View profile of ${doctor.name}`}
                          >
                            <FaArrowRight className="text-sm" />
                          </Link>
                        </div>

                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="text-center py-8 text-slate-400">No doctors found.</div>
          )}
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