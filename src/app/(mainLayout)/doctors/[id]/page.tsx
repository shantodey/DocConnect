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

export default async function DoctorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const doctor = await getDoctorById(id);

    if (!doctor) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-red-500">Doctor not found</h2>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
            {/* Breadcrumb Implementation */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/doctors">Doctors</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{doctor.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                <div className="md:col-span-2 space-y-8">
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <img src={doctor.image} alt={doctor.name} className="w-40 h-40 rounded-3xl object-cover bg-emerald-500 shrink-0" />
                        <div className="space-y-2">
                            <span className="bg-[#CCF0F3] text-[#00A5B5] text-xs font-semibold px-3 py-1 rounded-sm tracking-wide">
                                {doctor.specialization || doctor.specialty || "dermatologist"}
                            </span>
                            <h1 className="text-2xl font-extrabold text-slate-900">{doctor.name}</h1>
                            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                                <FaStar className="text-amber-400" /> <span>{doctor.rating || "3.9"}</span>
                            </div>
                            <p className="text-slate-500 text-sm max-w-md font-medium leading-relaxed">
                                Board-certified dermatologist specializing in personalized care for diverse skin concerns.
                            </p>
                        </div>
                    </div>

                    <Tabs defaultValue="About" className="w-full">
                        <TabsList className="border-b w-full flex items-start bg-transparent rounded-none h-auto p-0 gap-8">
                            <TabsTrigger value="About" className="cursor-pointer bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#006BFF] rounded-none shadow-none pb-2 px-0 text-sm font-semibold">About</TabsTrigger>
                            <TabsTrigger value="Feedback" className="cursor-pointer bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#006BFF] rounded-none shadow-none pb-2 px-0 text-sm font-semibold">Feedback</TabsTrigger>
                        </TabsList>
                        <TabsContent value="About" className="mt-6 space-y-8">
                            <div className="space-y-3">
                                <h2 className="text-lg font-bold text-slate-900">
                                    About of <span className="text-[#00A5B5]">{doctor.name}</span>
                                </h2>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    {doctor.about || `Dr. ${doctor.name} is a highly skilled and compassionate dermatologist dedicated to providing exceptional care...`}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900">Education</h3>
                                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
                                    <div>
                                        <p className="text-[#00A5B5] font-bold text-xs">Apr 20 2000 - Feb 17 2005</p>
                                        <p className="font-extrabold text-slate-800 mt-1">MBBS MD</p>
                                    </div>
                                    <p className="text-slate-500 font-medium">United Medicity</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900">Experience</h3>
                                <div className="text-sm">
                                    <p className="text-amber-500 font-bold text-xs">Apr 26 2005 - Feb 14 2014</p>
                                    <p className="font-extrabold text-slate-800 mt-1">Senior Dermatologist</p>
                                    <p className="text-slate-500 font-medium mt-0.5">{doctor.experienceDetails?.hospital || "Kamla Nehru Hospital"}</p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="Feedback" className="mt-6">
                            <FeedbackTab />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Side Sticky Card */}
                <div className="border border-slate-100 rounded-3xl p-6 bg-white space-y-6 shadow-xl shadow-slate-100/70 md:sticky md:top-6">
                    <div className="flex justify-between items-center font-medium">
                        <span className="text-slate-500 text-sm">Ticket Price</span>
                        <span className="text-lg font-extrabold text-slate-900">{doctor.fee || "300"} {doctor.currency || 'INR'}</span>
                    </div>

                    <div className="space-y-3">
                        <p className="font-bold text-slate-900 text-sm">Available Time Slots</p>
                        <div className="flex justify-between text-xs text-slate-600 font-medium">
                            <span className="text-slate-500">Monday</span>
                            <span>10:30 am - 12:30pm</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 font-medium">
                            <span className="text-slate-500">Wednesday</span>
                            <span>10:30 am - 12:30pm</span>
                        </div>
                    </div>

                    <Button className="w-full bg-[#006BFF] hover:bg-[#0056D4] text-white h-12 rounded-xl font-bold transition-colors text-sm">
                        Book Appointment
                    </Button>
                </div>
            </div>
        </div>
    );
}