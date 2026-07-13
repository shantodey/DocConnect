"use client";

import { useEffect, useState, use } from "react";
import { DoctorCard, type Doctor } from "@/components/DoctorCard";
import { getDoctors } from "../../server/serverAction";
import { DoctorCardSkeleton } from "./Doctorcardskeleton";
import { useRouter } from "next/navigation";


export function DoctorGrid({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const { search } = use(searchParams);
  const [doctors, setDoctors] = useState<Doctor[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    setDoctors(null);
    getDoctors(search).then(setDoctors);
  }, [search]);

  return (
    <div>
      <div className="w-full bg-[#FAF6EC] py-16 px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-8 tracking-tight">Find a Doctor</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          router.push(`/doctors?search=${encodeURIComponent(formData.get("query") as string)}`);
        }} className="flex items-center w-full max-w-2xl bg-[#D2E0F2] rounded-xl p-1 shadow-sm">
          <input type="text" name="query" defaultValue={search || ""} placeholder="Search Doctor" className="w-full bg-transparent border-none outline-none p-3" />
          <button type="submit" className="bg-[#006BFF] text-white px-8 h-12 rounded-lg">Search</button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {doctors === null
          ? Array.from({ length: 8 }).map((_, i) => <DoctorCardSkeleton key={i} />)
          : doctors.map((doctor) => <DoctorCard key={typeof doctor._id === "string" ? doctor._id : doctor._id.$oid} doctor={doctor}/>)}
      </div>
    </div>
  );
}