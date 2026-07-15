"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaStar, FaTrashCan, FaSpinner } from "react-icons/fa6";
import { getMyDoctorServices, updateDoctorService, deleteDoctorService } from "../../../../server/serverAction";
import { authClient } from "@/lib/auth-client";
import Editdoctorservicedialog from "./Editdoctorservicedialog";
import { GiStethoscope } from "react-icons/gi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { CiCirclePlus, CiClock2 } from "react-icons/ci";
import { PiGraduationCapLight } from "react-icons/pi";
import Link from "next/link";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DoctorService {
    _id: string | { $oid: string };
    id: string;
    name?: string;
    specialization?: string;
    image?: string;
    about?: string;
    fee: number;
    currency?: string;
    rating?: number;
    patientCount?: number;
    education?: {
        degree: string;
        university: string;
    };
    availableSlots?: { time: string; status: "available" | "booked" }[];
}

const getServiceId = (service: any): string => {
    if (!service) return "";
    if (typeof service._id === "object" && service._id?.$oid) {
        return service._id.$oid;
    }
    return service._id || "";
};

// ==========================================
// ১. ডিলিট বাটন কম্পোনেন্ট (Shadcn + React Icons)
// ==========================================
interface DeleteButtonProps {
    serviceId: string;
    userId: string;
    onDeleteSuccess: (id: string) => void;
}

const DeleteMyServices = ({ serviceId, userId, onDeleteSuccess }: DeleteButtonProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        if (!serviceId || !userId) return;

        setIsDeleting(true);
        try {
            const response = await deleteDoctorService(serviceId, userId);

            if (response?.success) {
                toast.success("Service deleted successfully!");
                onDeleteSuccess(serviceId); 
                setIsOpen(false);
            } else {
                toast.error(response?.message || "Failed to delete service.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger render={<button
                type="button"
                className="w-10 h-10 rounded-full border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 shrink-0"
                aria-label="Delete service"
            >
                <FaTrashCan className="h-3.5 w-3.5" />
            </button>}>

            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white rounded-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-900 font-bold">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500 text-sm">
                        This action cannot be undone. This will permanently delete your medical service listing from our platform.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel render={<Button variant="outline" disabled={isDeleting} className="rounded-xl">
                            Cancel
                        </Button>}>
                        
                    </AlertDialogCancel>
                    <Button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-xl gap-2 font-semibold"
                    >
                        {isDeleting ? (
                            <>
                                <FaSpinner className="h-3.5 w-3.5 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Yes, Delete"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


const MyServicesPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [services, setServices] = useState<DoctorService[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<DoctorService | null>(null);

    const fetchServices = () => {
        if (!user?.id) return;
        setLoading(true);
        getMyDoctorServices(user.id).then((data) => { setServices(data || []); setLoading(false); });
    };

    useEffect(() => { fetchServices(); }, [user?.id]);

    const handleSave = async (updatedData: any) => {
        if (!editing || !user?.id) return;
        const serviceId = getServiceId(editing);
        const userId = user.id;

        if (!serviceId) return;

        try {
            const response = await updateDoctorService(serviceId, userId, updatedData);
            if (response?.success) {
                setServices((prev) => prev.map((s) => getServiceId(s) === serviceId ? { ...s, ...updatedData } : s));
            }
        } catch (error) {
            console.error("Error saving service:", error);
        } finally { setEditing(null); }
    };

    // UI থেকে কার্ড ফিল্টার করার ফাংশন
    const handleDeleteSuccess = (deletedId: string) => {
        setServices((prev) => prev.filter((s) => getServiceId(s) !== deletedId));
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Medical Services</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage and update your clinical listings, schedules, and profile info.</p>
                </div>
                {services.length > 0 && (
                    <Link href={'/addservice'}>
                        <Button size="sm" className="gap-2 self-start sm:self-auto bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 py-5 font-semibold">
                            <CiCirclePlus className="h-4 w-4" /> Add New Service
                        </Button>
                    </Link>
                )}
            </div>

            {/* Loading Skeleton */}
            {loading && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2].map((i) => (<Skeleton key={i} className="h-[450px] w-full rounded-3xl" />))}
                </div>
            )}

            {/* Empty State */}
            {!loading && services.length === 0 && (
                <div className="flex flex-col items-center gap-4 rounded-3xl bg-slate-50 py-20 text-center border-none">
                    <div className="rounded-full bg-teal-50 p-5 text-teal-700">
                        <GiStethoscope className="h-10 w-10" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-lg font-bold text-slate-900">No services active</p>
                        <p className="text-sm text-slate-500 max-w-xs">Set up your doctor profile card to showcase slots and pricing.</p>
                    </div>
                    <Link href={'/addservice'}>
                        <Button size="sm" className="mt-2 gap-2 bg-slate-900 hover:bg-slate-800 rounded-full text-white font-semibold">
                            <CiCirclePlus className="h-4 w-4" /> Add your first service
                        </Button>
                    </Link>
                </div>
            )}

            {!loading && services.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((doc) => (
                        <DoctorServiceCard
                            key={getServiceId(doc) || doc.id}
                            doc={doc}
                            onEdit={() => setEditing(doc)}
                            userId={user?.id || ""}
                            onDeleteSuccess={handleDeleteSuccess}
                        />
                    ))}
                </div>
            )}

            {editing && (
                <Editdoctorservicedialog
                    open={!!editing}
                    onOpenChange={(open: boolean) => !open && setEditing(null)}
                    doctor={editing}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};


interface CardProps {
    doc: DoctorService;
    onEdit: () => void;
    userId: string;
    onDeleteSuccess: (id: string) => void;
}

const DoctorServiceCard = ({ doc, onEdit, userId, onDeleteSuccess }: CardProps) => {
    const randomBg = "bg-teal-50/50";
    const serviceId = getServiceId(doc);

    return (
        <div className="flex flex-col bg-white rounded-3xl overflow-hidden p-3 select-none shadow-sm hover:shadow-xl transition-all duration-300 group border-none">

            <div className={`${randomBg} relative w-full aspect-square rounded-[28px] overflow-hidden flex items-end justify-center`}>
                {doc.image ? (
                    <Image src={doc.image} alt={doc.name || "Doctor"} fill className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-extrabold text-teal-800 bg-teal-100">
                        {(doc.name ?? "?").charAt(0)}
                    </div>
                )}
            </div>

            <div className="pt-5 pb-2 px-2 space-y-3.5">
                <h3 className="text-xl font-bold text-slate-900 capitalize truncate"> Dr. {doc.name || "Unnamed"} </h3>
                <div className="flex items-center justify-between gap-2">
                    <span className="bg-[#D2F4F8] text-[#1FA6B8] text-xs font-bold px-3 py-1.5 rounded-lg truncate"> {doc.specialization || "General Physician"} </span>
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-800 shrink-0">
                        <FaStar className="text-amber-400" />
                        <span>{doc.rating?.toFixed(1) ?? "0.0"}</span>
                        <span className="text-slate-400 font-medium text-xs">({doc.patientCount ? doc.patientCount * 2 + 1 : 0})</span>
                    </div>
                </div>

                {doc.education?.degree && (
                    <div className="flex items-start gap-1.5 text-xs text-slate-500 bg-slate-50 p-2 rounded-xl">
                        <PiGraduationCapLight className="h-4 w-4 shrink-0 text-[#1FA6B8] mt-0.5" />
                        <span className="font-medium line-clamp-1"> {doc.education.degree} — {doc.education.university} </span>
                    </div>
                )}

                {doc.availableSlots && doc.availableSlots.length > 0 && (
                    <div className="space-y-1.5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <CiClock2 className="h-3 w-3 text-slate-400" /> Available Slots
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {doc.availableSlots.slice(0, 2).map((slot, i) => (
                                <Badge key={i} variant="secondary" className={`text-[9px] font-semibold px-2 py-0.5 rounded-md border-none ${slot.status === "booked"
                                    ? "bg-slate-100 text-slate-300 line-through" : "bg-emerald-50 text-emerald-700"}`}>{slot.time}
                                </Badge>
                            ))}
                            {doc.availableSlots.length > 2 && (
                                <Badge variant="outline" className="text-[9px] text-slate-400 border-slate-200 px-1 rounded-md"> +{doc.availableSlots.length - 2} more</Badge>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-end justify-between gap-4 pt-2 border-t border-slate-100">
                    <div className="space-y-0.5 min-w-0">
                        <h4 className="text-sm font-extrabold text-slate-900">  +{doc.patientCount ?? 0} patients </h4>
                        <p className="text-xs text-slate-400 font-medium truncate">
                            {doc.fee ? `Fee: ${doc.fee} ${doc.currency || "BDT"}` : "Consultation fee not set"}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">

                        <DeleteMyServices
                            serviceId={serviceId}
                            userId={userId}
                            onDeleteSuccess={onDeleteSuccess}
                        />


                        <button type="button" onClick={onEdit}
                            className="w-10 h-10 rounded-full border border-slate-900 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 shrink-0"
                            aria-label={`Edit profile of Dr. ${doc.name}`} >
                            <HiOutlinePencilSquare className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyServicesPage;