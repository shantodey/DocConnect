"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { getMyAppointments, cancelAppointment } from "../../../../server/serverAction";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "./spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog";
import { AiOutlineDelete } from "react-icons/ai";
import { GiStethoscope } from "react-icons/gi";
import { FcAlarmClock } from "react-icons/fc";
import { LuCalendarClock } from "react-icons/lu";

type Appointment = {
    _id: string;
    doctorName: string;
    doctorImg: string;
    specialty: string;
    fee: number;
    date: string;
    timeSlot: string;
};

function groupByMonth(appointments: Appointment[]) {
    const groups: Record<string, Appointment[]> = {};
    for (const a of appointments) {
        const key = new Date(a.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
        (groups[key] ??= []).push(a);
    }
    return groups;
}

function isPast(dateStr: string) {
    return new Date(dateStr) < new Date(new Date().toDateString());
}

const page = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [cancellingId, setCancellingId] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;
        getMyAppointments(user.id).then(setAppointments);
    }, [user]);

    async function handleCancel(id: string) {
        setCancellingId(id);
        const ok = await cancelAppointment(id);
        if (ok) setAppointments((prev) => prev.filter((a) => a._id !== id));
        setCancellingId(null);
    }

    if (isPending) return <div className="flex items-center justify-center gap-2 p-10"><Spinner className="size-5" /></div>;

    const grouped = groupByMonth(appointments);
    const months = Object.keys(grouped);

    return (
        <div>
            <div className="max-w-3xl mx-auto px-6 py-16">
                <header>
                    <p className="font-mono text-xs tracking-widest uppercase text-[#2D6A5F] mb-3"> Patient chart · {user?.name} </p>
                    <h1 className="font-serif text-4xl sm:text-5xl text-[#0F1729] leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>Your appointments</h1>
                    <p className="text-[#8B93A7] mt-3 max-w-md">   {appointments.length} scheduled visit{appointments.length !== 1 ? "s" : ""} on record. </p>
                </header>

                {appointments.length === 0 ? (
                    <div className="border border-dashed border-[#B8622E]/30 rounded-xl p-10 text-center">
                        <p className="text-[#8B93A7]">No appointments booked yet.</p>
                    </div>
                ) : (
                    <div className="space-y-14">
                        {months.map((month) => (
                            <div key={month}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="font-mono text-xs uppercase tracking-widest text-[#8B93A7]">{month}</span>
                                    <Separator className="flex-1 bg-[#0F1729]/10" />
                                </div>

                                <div className="relative pl-8">
                                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#0F1729]/10" />

                                    <div className="space-y-8">
                                        {grouped[month].map((a) => {
                                            const past = isPast(a.date);
                                            return (
                                                <div key={a._id} className="relative">
                                                    <span className="absolute -left-8 top-2 w-3.5 h-3.5 rounded-full border-2"
                                                        style={{ background: past ? "#F7F5F0" : "#2D6A5F", borderColor: past ? "#B8622E" : "#2D6A5F" }} />

                                                    <div className="flex gap-4 items-start bg-white/60 border border-[#0F1729]/8 rounded-xl p-4 hover:border-[#2D6A5F]/40 transition-colors">
                                                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#0F1729]/5">
                                                            <Image src={a.doctorImg || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnOCswwj3QvF-fyh_rW5UH3otGRu0bpieqX8ENSmcqkUUCn-KblNqHgtXg&s=10"}
                                                                alt={a.doctorName} fill className="object-cover" sizes="56px" />
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between gap-3">
                                                                <h3 className="font-serif text-lg text-[#0F1729] truncate" style={{ fontFamily: "'Fraunces', serif" }}>
                                                                    {a.doctorName}
                                                                </h3>
                                                                <div className="flex items-center gap-2 shrink-0">
                                                                    {past && (
                                                                        <Badge className="bg-[#B8622E]/10 text-[#B8622E] border-none font-mono text-[10px]">
                                                                            Past
                                                                        </Badge>
                                                                    )}
                                                                    {!past && (
                                                                        <AlertDialog>
                                                                            <AlertDialogTrigger render={
                                                                                <button  aria-label="Cancel appointment"  className="text-[#8B93A7] hover:text-[#B8622E] transition-colors" disabled={cancellingId === a._id}>
                                                                                    {cancellingId === a._id ? <Spinner className="size-3.5" /> : <AiOutlineDelete className="w-4.5 h-4.5"/>}
                                                                                </button>
                                                                            } />
                                                                            <AlertDialogContent className="bg-[#F7F5F0] border-[#0F1729]/10 rounded-2xl shadow-xl">
                                                                                <AlertDialogHeader>
                                                                                    <AlertDialogTitle className="font-serif text-2xl text-[#0F1729]" style={{ fontFamily: "'Fraunces', serif" }}>
                                                                                        Cancel this appointment?
                                                                                    </AlertDialogTitle>
                                                                                    <AlertDialogDescription className="text-[#8B93A7]">
                                                                                        Your visit with <span className="text-[#0F1729] font-medium">{a.doctorName}</span> on{" "}
                                                                                        <span className="font-mono text-[#0F1729]">{a.date}</span> at{" "}
                                                                                        <span className="font-mono text-[#0F1729]">{a.timeSlot}</span> will be cancelled. This can&apos;t be undone.
                                                                                    </AlertDialogDescription>
                                                                                </AlertDialogHeader>
                                                                                <AlertDialogFooter>
                                                                                    <AlertDialogAction onClick={() => handleCancel(a._id)}  className="bg-[#B8622E] hover:bg-[#B8622E]/90 text-white">
                                                                                        Cancel appointment
                                                                                    </AlertDialogAction>
                                                                                    <AlertDialogCancel className="border-[#0F1729]/15 text-[#0F1729] hover:bg-[#0F1729]/5">
                                                                                        Keep appointment
                                                                                    </AlertDialogCancel>
                                                                                </AlertDialogFooter>
                                                                            </AlertDialogContent>
                                                                        </AlertDialog>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-1.5 text-sm text-[#2D6A5F] mt-0.5">
                                                                <GiStethoscope className="w-3.5 h-3.5"/>
                                                                {a.specialty}
                                                            </div>

                                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 font-mono text-xs text-[#8B93A7]">
                                                                <span className="flex items-center gap-1">
                                                                    <LuCalendarClock className="w-3.5 h-3.5" /> {a.date}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <FcAlarmClock className="w-3.5 h-3.5" /> {a.timeSlot}
                                                                  
                                                                </span>
                                                                <span>{a.fee.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;