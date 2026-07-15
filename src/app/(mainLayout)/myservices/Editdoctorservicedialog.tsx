"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export interface IDoctorServiceInput {
    specialization: string;
    experience: number;
    fee: number;
    currency: string;
    about: string;
    education: {
        degree: string;
        university: string;
        startDate: string;
        endDate: string;
    };
    experienceDetails: {
        position: string;
        hospital: string;
        startDate: string;
        endDate: string;
    };
    availableSlots: {
        time: string;
        status: "available" | "booked";
    }[];
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string;
    rating?: number;
    patientCount?: number;
}

// প্রপ্সের ইন্টারফেস ডিফাইন করা হলো
interface EditDoctorServiceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    doctor: any;
    onSave: (updatedData: any) => Promise<void>;
}

export default function EditDoctorServiceDialog({
    open,
    onOpenChange,
    doctor,
    onSave,
}: EditDoctorServiceDialogProps) {

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<IDoctorServiceInput>({
        defaultValues: {
            currency: "BDT",
            availableSlots: [
                { time: "10:00 AM - 02:10 PM", status: "available" },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "availableSlots" });

    useEffect(() => {
        if (doctor && open) {
            reset({
                specialization: doctor.specialization || "",
                experience: doctor.experience || 0,
                fee: doctor.fee || 0,
                currency: doctor.currency || "BDT",
                about: doctor.about || "",
                education: {
                    degree: doctor.education?.degree || "",
                    university: doctor.education?.university || "",
                    startDate: doctor.education?.startDate || "",
                    endDate: doctor.education?.endDate || "",
                },
                experienceDetails: {
                    position: doctor.experienceDetails?.position || "",
                    hospital: doctor.experienceDetails?.hospital || "",
                    startDate: doctor.experienceDetails?.startDate || "",
                    endDate: doctor.experienceDetails?.endDate || "",
                },
                availableSlots: doctor.availableSlots?.length > 0
                    ? doctor.availableSlots.map((slot: any) => ({
                        time: slot.time || "",
                        status: slot.status || "available",
                    }))
                    : [{ time: "10:00 AM - 02:10 PM", status: "available" }],
            });
        }
    }, [doctor, open, reset]);

    const onSubmit: SubmitHandler<IDoctorServiceInput> = async (data) => {
        try {
            const formattedData = {
                ...data,
                fee: Number(data.fee),
                experience: Number(data.experience),
                availableSlots: data.availableSlots.map((slot) => ({
                    time: slot.time,
                    status: slot.status || "available",
                })),
            };

            await onSave(formattedData);
            toast.success("Doctor service updated successfully!");
        } catch (error: any) {
            console.error("Error updating doctor service:", error);
            toast.error(error?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6  bg-white">
            
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Professional Overview</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                                <input type="text" placeholder="e.g. Cardiologist, Neurologist"  {...register("specialization", { required: "Specialization is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    defaultValue={doctor?.specialization}
                                />
                                {errors.specialization && <span className="text-xs text-red-500 mt-1">{errors.specialization.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                                <input type="number" placeholder="e.g. 15" {...register("experience", { required: "Experience is required", min: 0 })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    defaultValue={doctor?.experience}
                                />
                                {errors.experience && <span className="text-xs text-red-500 mt-1">{errors.experience.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
                                <input type="number" placeholder="e.g. 1200" {...register("fee", { required: "Fee is required", min: 0 })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    defaultValue={doctor?.fee}
                                />
                                {errors.fee && <span className="text-xs text-red-500 mt-1">{errors.fee.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Currency</label>
                                <select {...register("currency")}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    defaultValue={doctor?.currency || "BDT"}
                                >
                                    <option value="BDT">BDT (৳)</option>
                                    <option value="USD">USD ($)</option>
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">About (Short Bio)</label>
                                <textarea rows={3} placeholder="Briefly describe your expertise..." {...register("about", { required: "About bio is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    defaultValue={doctor?.about}
                                />
                                {errors.about && <span className="text-xs text-red-500 mt-1">{errors.about.message}</span>}
                            </div>
                        </div>
                    </div>


                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Education Details</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Degree</label>
                                <input type="text" placeholder="e.g. MBBS, FCPS (Cardiology)" {...register("education.degree", { required: "Degree is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                />
                                {errors.education?.degree && <span className="text-xs text-red-500 mt-1">{errors.education.degree.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">University / Institution</label>
                                <input type="text" placeholder="e.g. BSMMU" {...register("education.university", { required: "University is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                />
                                {errors.education?.university && <span className="text-xs text-red-500 mt-1">{errors.education.university.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input type="date" {...register("education.startDate", { required: "Start date is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                />
                                {errors.education?.startDate && <span className="text-xs text-red-500 mt-1">{errors.education.startDate.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input type="date" {...register("education.endDate", { required: "End date is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                />
                                {errors.education?.endDate && <span className="text-xs text-red-500 mt-1">{errors.education.endDate.message}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Work Experience */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Work Experience</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Position</label>
                                <input type="text" placeholder="e.g. Senior Consultant" {...register("experienceDetails.position", { required: "Position is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                />
                                {errors.experienceDetails?.position && <span className="text-xs text-red-500 mt-1">{errors.experienceDetails.position.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hospital / Clinic</label>
                                <input type="text" placeholder="e.g. Labaid Cardiac Hospital" {...register("experienceDetails.hospital", { required: "Hospital is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                />
                                {errors.experienceDetails?.hospital && <span className="text-xs text-red-500 mt-1">{errors.experienceDetails.hospital.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input type="date" {...register("experienceDetails.startDate", { required: "Start date is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                />
                                {errors.experienceDetails?.startDate && <span className="text-xs text-red-500 mt-1">{errors.experienceDetails.startDate.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date / Present</label>
                                <input type="text" placeholder="e.g. Present" {...register("experienceDetails.endDate", { required: "End date is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                />
                                {errors.experienceDetails?.endDate && <span className="text-xs text-red-500 mt-1">{errors.experienceDetails.endDate.message}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Available Slots Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Available Slots</h2>
                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-3 rounded-lg border border-gray-100 p-4 bg-gray-50/50">
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Time Range</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 10:35 AM - 02:10 PM"
                                            {...register(`availableSlots.${index}.time` as const, { required: "Time slot is required" })}
                                            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                        />
                                        {errors.availableSlots?.[index]?.time && (
                                            <span className="text-xs text-red-500 mt-1">
                                                {errors.availableSlots[index]?.time?.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="w-32">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                                        <select
                                            {...register(`availableSlots.${index}.status` as const)}
                                            className="block w-full rounded-lg border border-gray-300 px-3 py-[9px] text-sm bg-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                        >
                                            <option value="available">Available</option>
                                            <option value="booked">Booked</option>
                                        </select>
                                    </div>

                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-muted-foreground hover:text-red-500 pt-5 transition duration-200"
                                            title="Remove Slot"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button type="button"  onClick={() => append({ time: "10:00 AM - 01:00 PM", status: "available" })}
                                className="mt-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition block">
                                + Add More Slot
                            </button>
                        </div>
                    </div>

                    <div className="pt-6 flex flex-col gap-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full py-3 rounded-lg text-base font-semibold">  Cancel </Button>
                        <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg text-base font-semibold shadow-sm transition-all"> Save Changes </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}