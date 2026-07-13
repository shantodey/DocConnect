import { DoctorGrid } from "@/components/DoctorGrid";

export default function DoctorsPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-10">
        <DoctorGrid searchParams={searchParams} />

        
      </main>
    </>
  );
}