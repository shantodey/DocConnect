import { FaStar } from "react-icons/fa";
import { FiArrowRight, FiBriefcase, FiMapPin } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export interface Doctor {
  _id: { $oid: string } | string;
  name: string;
  email: string;
  role: string;
  specialization: string;
  experience: number;
  rating: number;
  fee: number;
  currency: string;
  image: string;
  about: string;
  experienceDetails: {
    hospital: string;
  };
}

const BG_COLORS = ["#DDF4FF", "#F3F0FF", "#E8FFF1", "#FFF4E8", "#FCEEFF", "#EEF7FF"];

function pickBg(id: { $oid: string } | string) {
  const str = typeof id === "string" ? id : id?.$oid ?? "";
  const hash = [...str].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return BG_COLORS[hash % BG_COLORS.length];
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const bg = pickBg(doctor._id);
  const doctorId = typeof doctor._id === "string" ? doctor._id : doctor._id.$oid;

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-72 overflow-hidden" style={{ backgroundColor: bg }}>
        <Image src={doctor.image} alt={doctor.name} fill className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
      </div>

      <div className="space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
            {doctor.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {doctor.specialization}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <span className="font-semibold">{doctor.rating}</span>
            <span className="text-sm text-slate-500">(120 Reviews)</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FiBriefcase />
            {doctor.experience}+ Years
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <FiMapPin className="text-blue-500" />
          <span className="line-clamp-1">{doctor.experienceDetails.hospital}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Consultation Fee</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{doctor.currency} {doctor.fee}</p>
          </div>

          <Link  href={`/doctors/${doctorId}`}
            className="flex items-center gap-2 rounded-full border p-3 transition-all  "> <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}