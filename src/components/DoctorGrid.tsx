"use client";

import { useEffect, useState, use } from "react";
import { DoctorCard, type Doctor } from "@/components/DoctorCard";
import { getDoctors } from "../../server/serverAction";
import { DoctorCardSkeleton } from "./Doctorcardskeleton";
import { useRouter } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DoctorGrid({ searchParams }: { searchParams: Promise<{ search?: string; page?: string; sort?: string; specialty?: string }> }) {
  const { search, page, sort, specialty } = use(searchParams);
  const currentPage = parseInt(page || "1");

  const [data, setData] = useState<{ doctors: Doctor[]; totalPages: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    setData(null);
    getDoctors(search, currentPage, sort, specialty).then(setData);
  }, [search, currentPage, sort, specialty]);

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
    if (specialty) params.append("specialty", specialty);

    // null চেক করে নিরাপদ ভ্যালু অ্যাসাইন করুন
    const safeValue = value || "all";

    if (safeValue === "all") params.delete(key);
    else params.set(key, safeValue);

    params.set("page", "1");
    router.push(`/doctors?${params.toString()}`);
  };
  return (
    <div>
      <div className="w-full bg-gradient-to-b from-[#FAF6EC] to-white py-16 px-4 flex flex-col items-center justify-center text-center border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight">
          Find a Doctor
        </h1>

        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 items-center bg-white p-2 rounded-2xl shadow-md border border-gray-100">
          {/* Search Form */}
          <form onSubmit={(e) => {  e.preventDefault();  const formData = new FormData(e.currentTarget);  const queryVal = (formData.get("query") as string) || "";
              router.push(`/doctors?search=${encodeURIComponent(queryVal)}&page=1`);
            }}
            className="flex items-center w-full bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#006BFF] transition-all"
          >
            <input
              type="text"
              name="query"
              defaultValue={search || ""}
              placeholder="Search doctor by name..."
              className="w-full bg-transparent outline-none p-3.5 text-gray-800 placeholder-gray-400 text-sm"
            />
            <button type="submit" className="bg-[#006BFF] hover:bg-[#0056cc] text-white px-6 py-2.5 mr-1.5 text-sm font-medium rounded-lg transition-colors">
              Search
            </button>
          </form>

          {/* Filters Section */}
          <div className="flex w-full md:w-auto gap-3 shrink-0">
            <Select value={sort || "all"} onValueChange={(val: string | null) => updateFilters("sort", val)}>
              <SelectTrigger className="w-full md:w-44 bg-white border-gray-200 h-[46px] rounded-xl text-sm text-gray-700">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Default Sorting</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={specialty || "all"} onValueChange={(val: string | null) => updateFilters("specialty", val)}>
              <SelectTrigger className="w-full md:w-44 bg-white border-gray-200 h-[46px] rounded-xl text-sm text-gray-700">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                  <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                  <SelectItem value="Neurologist">Neurologist</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {data === null
          ? Array.from({ length: 8 }).map((_, i) => <DoctorCardSkeleton key={i} />)
          : data.doctors.map((doctor) => <DoctorCard key={typeof doctor._id === "string" ? doctor._id : doctor._id.$oid} doctor={doctor} />)}
      </div>

      {data && data.totalPages > 1 && (
        <div className="mt-10 text-left">
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious  href="#"
                  onClick={(e) => { e.preventDefault(); if (currentPage > 1) updateFilters("page", (currentPage - 1).toString()); }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: data.totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => { e.preventDefault(); updateFilters("page", (i + 1).toString()); }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (currentPage < data.totalPages) updateFilters("page", (currentPage + 1).toString()); }}
                  className={currentPage === data.totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}