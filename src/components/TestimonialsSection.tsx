"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';

// TypeScript Interface
interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
  avatarUrl: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Naif Farooqui",
    rating: 5,
    review: "I have taken medical services from them. They treat so well and they are Providing the best medical services.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    name: "Shoaib Ahmad",
    rating: 5,
    review: "I have taken medical services from them. They treat so well and they are Providing the best medical services.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    name: "Kaif Khan",
    rating: 5,
    review: "I have taken medical services from them. They treat so well and they are Providing the best medical services.",
    avatarUrl: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 4,
    name: "Zayan Rahman",
    rating: 5,
    review: "The doctors here are top notch. Their behavior and immediate response structure saved my family during an emergency crisis.",
    avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 5,
    name: "Anika Tabassum",
    rating: 5,
    review: "Very professional workflow. Booking via the online portal was seamless and the virtual session saved me hours of traffic commute.",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 6,
    name: "Sajid Mahmud",
    rating: 5,
    review: "Unmatched primary diagnostic facility in the region. Highly recommended for chronic health tracking and standard followups.",
    avatarUrl: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export default function TestimonialsSection() {
  // Shadcn Carousel এর এপিআই ট্র্যাক করার স্টেট
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  // একটিভ বা সিলেক্টেড ইনডেক্স ট্র্যাক করার ইফেক্ট হুড়
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full bg-white py-16 px-4 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
            What our patient say
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-normal leading-relaxed">
            World class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>

        {/* Shadcn UI Carousel Engine */}
        <div className="w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonialsData.map((slide, index) => {
                // চেক করা হচ্ছে কারেন্ট ইনডেক্সটি একটিভ কিনা
                const isActive = current === index;

                return (
                  <CarouselItem key={slide.id} className="pl-4 sm:basis-1/1 md:basis-1/2 lg:basis-1/3 py-6">
                    <Card 
                      className={`border-none transition-all duration-300 rounded-2xl min-h-[220px] shadow-sm select-none
                        ${isActive 
                          ? 'bg-[#0066FF] text-white shadow-xl shadow-blue-200 scale-105' 
                          : 'bg-white text-slate-700 border border-slate-100 opacity-40'
                        }`}
                    >
                      <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[220px]">
                        
                        {/* Avatar & Meta Info Row */}
                        <div className="flex items-start gap-4">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                            <Image
                              src={slide.avatarUrl}
                              alt={slide.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>

                          <div className="space-y-1.5">
                            <h3 className={`text-lg font-bold tracking-tight ${isActive ? 'text-white' : 'text-slate-950'}`}>
                              {slide.name}
                            </h3>
                            <div className="flex items-center gap-0.5">
                              {[...Array(slide.rating)].map((_, i) => (
                                <FaStar key={i} className="text-[#FFB000] text-sm" />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Patient's Quote Text */}
                        <div className="pt-5 flex-1 flex items-center">
                          <p className={`text-sm leading-relaxed font-medium ${isActive ? 'text-white/90' : 'text-slate-600'}`}>
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

          {/* Dots Indicator using Shadcn API */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  current === index ? 'bg-[#0066FF] w-6' : 'bg-slate-200 w-2.5'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}