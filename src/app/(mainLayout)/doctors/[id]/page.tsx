import { FaStar } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getDoctorById } from "../../../../../server/serverAction";
import { FeedbackTab } from "../FeedbackTab";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BookAppointment } from "./BookAppointment";



export interface Doctor {
    _id?: string | { $oid: string };
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
    education?: {
        degree: string;
        university: string;
        startDate: string;
        endDate: string;
    };
    experienceDetails?: {
        position: string;
        hospital: string;
        startDate: string;
        endDate: string;
    };
    availableSlots?: Array<{
        time: string;
        status: string;
    }>;
    patientCount?: number;
}

export default async function DoctorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const doctor = (await getDoctorById(id)) as Doctor | null;

    if (!doctor) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-red-500">Doctor not found</h2>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
            {/* Breadcrumb */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link href="/">Home</Link>}>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link href="/doctors">Doctors</Link>}>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{doctor.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                {/* Left Section */}
                <div className="md:col-span-2 space-y-8">
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-40 h-40 rounded-3xl object-cover bg-emerald-500 shrink-0"
                        />
                        <div className="space-y-2">
                            <span className="bg-[#CCF0F3] text-[#00A5B5] text-xs font-semibold px-3 py-1 rounded-sm tracking-wide">
                                {doctor.specialization}
                            </span>
                            <h1 className="text-2xl font-extrabold text-slate-900">{doctor.name}</h1>
                            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                <FaStar className="text-amber-400" />
                                <span>{doctor.rating} ({doctor.patientCount ?? 0} patients)</span>
                            </div>
                            <p className="text-slate-500 text-sm max-w-md font-medium leading-relaxed">
                                {doctor.experience} years of experience in {doctor.specialization}.
                            </p>
                        </div>
                    </div>

                    <Tabs defaultValue="About" className="w-full">
                        <TabsList variant={'line'} className="border-b w-full flex items-start bg-transparent rounded-none h-auto p-0 gap-8">
                            <TabsTrigger value="About" className="cursor-pointer bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#006BFF] rounded-none shadow-none pb-2 px-0 text-sm font-semibold">About</TabsTrigger>
                            <TabsTrigger value="Feedback" className="cursor-pointer bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#006BFF] rounded-none shadow-none pb-2 px-0 text-sm font-semibold">Feedback</TabsTrigger>
                        </TabsList>

                        <TabsContent value="About" className="mt-6 space-y-8">
                            <div className="space-y-3">
                                <h2 className="text-lg font-bold text-slate-900">
                                    About <span className="text-[#00A5B5]">{doctor.name}</span>
                                </h2>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    {doctor.about}
                                </p>
                            </div>

                            {doctor.education && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-slate-900">Education</h3>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                                        <div>
                                            <p className="text-[#00A5B5] font-bold text-xs">
                                                {doctor.education.startDate} - {doctor.education.endDate}
                                            </p>
                                            <p className="font-extrabold text-slate-800 mt-1">{doctor.education.degree}</p>
                                        </div>
                                        <p className="text-slate-500 font-medium">{doctor.education.university}</p>
                                    </div>
                                </div>
                            )}

                            {doctor.experienceDetails && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-slate-900">Experience</h3>
                                    <div className="text-sm">
                                        <p className="text-amber-500 font-bold text-xs">
                                            {doctor.experienceDetails.startDate} - {doctor.experienceDetails.endDate}
                                        </p>
                                        <p className="font-extrabold text-slate-800 mt-1">{doctor.experienceDetails.position}</p>
                                        <p className="text-slate-500 font-medium mt-0.5">{doctor.experienceDetails.hospital}</p>
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="Feedback" className="mt-6">
                            <FeedbackTab />
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="border border-slate-100 rounded-3xl p-6 bg-white space-y-6 shadow-xl shadow-slate-100/70 md:sticky md:top-6">
                    <div className="flex justify-between items-center font-medium">
                        <span className="text-slate-500 text-sm">Ticket Price</span>
                        <span className="text-lg font-extrabold text-slate-900">
                            {doctor.fee} {doctor.currency}
                        </span>
                    </div>

                    {doctor.availableSlots && doctor.availableSlots.length > 0 && (
                        <div className="space-y-3">
                            <p className="font-bold text-slate-900 text-sm">Available Time Slots</p>
                            {doctor.availableSlots.map((slot, index) => (
                                <div key={index} className="flex justify-between text-xs text-slate-600 font-medium">
                                    <span className="text-slate-500">Slot {index + 1}</span>
                                    <span className={slot.status !== "available" ? "line-through text-slate-400" : ""}>
                                        {slot.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <BookAppointment
                        doctorName={doctor.name}
                        specialty={doctor.specialization}
                        fee={doctor.fee}
                        availableSlots={doctor.availableSlots || []}
                    />
                </div>
                <Button className="w-full bg-[#006BFF] hover:bg-[#0056D4] text-white h-12 rounded-xl font-bold transition-colors text-sm">
                    Book Appointment
                </Button>
            </div>
        </div>
   
  );
}