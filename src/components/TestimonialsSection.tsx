"use client";

import  { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
  avatarUrl: string;
}

const testimonialsData: Testimonial[] = [
  { id: 1, name: "Naif Farooqui", rating: 5, review: "I have taken medical services from them. They treat so well and they are Providing the best medical services.", avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvDobgk5BH2l3pqrDDylYi7pANVx3Ay-W2m7svo4LSSg&s=10" },
  { id: 2, name: "Shoaib Ahmad", rating: 5, review: "I have taken medical services from them. They treat so well and they are Providing the best medical services.", avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSo5IbBolczG_F0Zzg9sMrrxatbCNqKua9kK-VQLh7OA&s=10" },
  { id: 3, name: "Kaif Khan", rating: 5, review: "I have taken medical services from them. They treat so well and they are Providing the best medical services.", avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsvFIcUR8nJ4FUm0FP5f1fgq9iSusVodhxfYtxvxbEFg&s=10" },
  { id: 4, name: "Zayan Rahman", rating: 5, review: "The doctors here are top notch. Their behavior and immediate response structure saved my family during an emergency crisis.", avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=200" },
  { id: 5, name: "Anika Tabassum", rating: 5, review: "Very professional workflow. Booking via the online portal was seamless and the virtual session saved me hours of traffic commute.", avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWaRVbnpwd8QbN_ZlM4y-s1-CWpOhSXIfW_gPwnSoLQ&s=10" },
  { id: 6, name: "Sajid Mahmud", rating: 5, review: "Unmatched primary diagnostic facility in the region. Highly recommended for chronic health tracking and standard followups.", avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq45KKS-CUPOzUL61Nn-n3HQiS_B5sfN1XbNP1YVUCGQ&s=10" }
];

export default function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="w-full bg-white py-16 px-4 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">What our patient say</h2>
          <p className="text-slate-500 text-sm md:text-base">World class care for everyone. Our health system offers unmatched, expert health care.</p>
        </div>

        <div className="w-full">
          {/* Wider card space: changed -ml-4 to -ml-8 */}
          <Carousel setApi={setApi} opts={{ align: "center", loop: true }} className="w-full">
            <CarouselContent className="-ml-8">
              {testimonialsData.map((slide, index) => {
                const isActive = current === index;

                return (

                  <CarouselItem key={slide.id} className="pl-8 sm:basis-full md:basis-1/2 lg:basis-1/3 py-6">
                    <Card className={`border-none transition-all duration-300 rounded-2xl h-[180px] overflow-hidden shadow-sm select-none
                        ${isActive
                        ? 'bg-[#0066FF] text-white shadow-xl shadow-blue-200 scale-105'
                        : 'bg-white text-slate-700 border border-slate-100 opacity-40'
                      }`}
                    >
                      <CardContent className="p-6 flex flex-col justify-between h-full">

                        <div className="flex items-start gap-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                            <Image src={slide.avatarUrl} alt={slide.name} fill sizes="48px" className="object-cover" unoptimized />
                          </div>

                          <div className="min-w-0">
                            <h3 className={`text-base font-bold truncate ${isActive ? 'text-white' : 'text-slate-950'}`}>
                              {slide.name}
                            </h3>
                            <div className="flex items-center gap-0.5 mt-0.5">
                              {[...Array(slide.rating)].map((_, i) => (
                                <FaStar key={i} className="text-[#FFB000] text-xs" />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Patient's Quote Text */}
                        <div className="mt-3 flex-1 overflow-hidden">
                          <p className={`text-xs sm:text-sm leading-relaxed font-medium line-clamp-3 ${isActive ? 'text-white/90' : 'text-slate-600'}`}>
                            &ldquo;{slide.review}&rdquo;
                          </p>
                        </div>

                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, index) => (
              <button key={index} onClick={() => api?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${current === index ? 'bg-[#0066FF] w-6' : 'bg-slate-200 w-2.5'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}