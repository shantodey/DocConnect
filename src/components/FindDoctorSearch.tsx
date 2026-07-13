"use client";

import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FindDoctorSearch() {
  const { register, handleSubmit } = useForm<{ query: string }>();

  const onSubmit = async (data: { query: string }) => {
    try {
      const res = await fetch(`/api/doctors?search=${encodeURIComponent(data.query)}`);
      if (!res.ok) throw new Error();
      const doctors = await res.json();
      console.log(doctors);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-[#FAF6EC] py-16 px-4 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-black mb-8 tracking-tight">
        Find a Doctor
      </h1>

      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full max-w-2xl bg-[#D2E0F2] rounded-xl p-1 shadow-sm"
      >
        <div className="relative flex-1 flex items-center pl-3">
          <FiSearch className="text-slate-500 text-xl pointer-events-none" />
          <Input
            type="text"
            placeholder="Search Doctor"
            {...register("query")}
            className="w-full bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-700 placeholder:text-slate-500 h-12 text-base pl-2"
          />
        </div>
        <Button 
          type="submit"
          className="bg-[#006BFF] hover:bg-[#0056D4] text-white font-semibold px-8 h-12 rounded-lg transition-colors text-base"
        >
          Search
        </Button>
      </form>
    </div>
  );
}