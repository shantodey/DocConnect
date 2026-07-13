import { DoctorGrid } from "@/components/DoctorGrid";

export default function DoctorsPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  return (
    <>
      <main>
        <DoctorGrid searchParams={searchParams} />
      </main>
    </>
  );
}