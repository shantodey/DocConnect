"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addDoctorService } from "../../../../server/serverAction";
import { authClient } from "@/lib/auth-client";

interface IDoctorServiceInput {
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
        startTime?: string;
        endTime?: string;
        time: string;
        status: "available" | "booked";
    }[];
    name?: string;
    email?: string;
    role?: string;
    image?: string;
    rating?: number;
    patientCount?: number;
}

export default function AddDoctorServiceForm() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const { image, name, role, email }: any = user || { image: undefined, name: "", role: "", email: "" };

    const { register, control, handleSubmit, formState: { errors } } = useForm<IDoctorServiceInput>({
        defaultValues: { currency: "BDT", availableSlots: [{ startTime: "10:00", endTime: "13:00", status: "available" } as any], },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "availableSlots", });

    const onSubmit: SubmitHandler<IDoctorServiceInput> = async (data) => {
        const currentUser = session?.user;

        if (!currentUser) {
            console.error("User session not found. Please log in.");
            return;
        }

        const format12 = (t: string) => {
            if (!t) return "";
            let [h, m] = t.split(":").map(Number);
            return `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
        };

        const finalSlots = data.availableSlots.map((slot: any) => ({
            time: `${format12(slot.startTime)} - ${format12(slot.endTime)}`,
            status: slot.status || "available"
        }));

        const formattedData = {
            ...data,
            name: currentUser.name,
            email: currentUser.email,
            fee: Number(data.fee),
            rating: 4.5,
            patientCount: 0,
            experience: Number(data.experience),
            availableSlots: finalSlots,
            image: currentUser.image,
        };

        console.log("Sending to backend:", formattedData);

        const ok = await addDoctorService(formattedData);
        if (!ok) return console.error("Failed to save doctor.");
    };

    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Complete Your Doctor Profile</h1>
                    <p className="mt-2 text-sm text-gray-500">Provide your professional details to start receiving appointments.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-4">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                            {image ? (
                                <img src={image} alt={name || "Doctor"} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full bg-gray-200" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{name ? `Dr. ${name}` : "Doctor"}</p>
                            <p className="text-xs text-gray-500">{email} | Role: {role || "N/A"}</p>
                        </div>
                    </div>
                    
                    {/* ফুরম ইনপুট ফিল্ড সমূহ (specialization, experience ইত্যাদি আগের মতোই থাকবে) */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Professional Overview</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                                <input type="text" placeholder="e.g. Cardiologist, Neurologist"
                                    {...register("specialization", { required: "Specialization is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    />
                                {errors.specialization && <span className="text-xs text-red-500 mt-1">{errors.specialization.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                                <input type="number" placeholder="e.g. 15" {...register("experience", { required: "Experience is required", min: 0 })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    />
                                {errors.experience && <span className="text-xs text-red-500 mt-1">{errors.experience.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
                                <input  type="number"  placeholder="e.g. 1200"{...register("fee", { required: "Fee is required", min: 0 })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    />
                                {errors.fee && <span className="text-xs text-red-500 mt-1">{errors.fee.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Currency</label>
                                <select {...register("currency")}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    >
                                    <option value="BDT">BDT (৳)</option>
                                    <option value="USD">USD ($)</option>
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">About (Short Bio)</label>
                                <textarea rows={3} placeholder="Briefly describe your expertise..." {...register("about", { required: "About bio is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    />
                                {errors.about && <span className="text-xs text-red-500 mt-1">{errors.about.message}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Education */}
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
                                <input  type="text"  placeholder="e.g. BSMMU"  {...register("education.university", { required: "University is required" })}
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
                                <input type="text"  placeholder="e.g. Labaid Cardiac Hospital"  {...register("experienceDetails.hospital", { required: "Hospital is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    />
                                {errors.experienceDetails?.hospital && <span className="text-xs text-red-500 mt-1">{errors.experienceDetails.hospital.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input  type="date"  {...register("experienceDetails.startDate", { required: "Start date is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    />
                                {errors.experienceDetails?.startDate && <span className="text-xs text-red-500 mt-1">{errors.experienceDetails.startDate.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date (or 'Present')</label>
                                <input type="text" placeholder="e.g. Present" {...register("experienceDetails.endDate", { required: "End date is required" })}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    />
                                {errors.experienceDetails?.endDate && <span className="text-xs text-red-500 mt-1">{errors.experienceDetails.endDate.message}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Available Slots */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Available Slots</h2>
                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex flex-col gap-1 rounded-lg border border-gray-100 p-4 bg-gray-50/50">
                                    <div className="flex flex-wrap items-end gap-4">
                                        <div className="flex-1 min-w-[120px]">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Start Time</label>
                                            <input type="time"  required  {...register(`availableSlots.${index}.startTime` as any, { required: "Start time is required" })}
                                                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 appearance-none"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-[120px]">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">End Time</label>
                                            <input  type="time"  required {...register(`availableSlots.${index}.endTime` as any, { required: "End time is required" })}
                                                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 appearance-none"
                                            />
                                        </div>

                                        {fields.length > 1 && (
                                            <button type="button" onClick={() => remove(index)} className="text-sm font-medium text-red-500 hover:text-red-700 pb-2.5 transition h-10 flex items-center">
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    {((errors.availableSlots as any)?.[index]?.startTime || (errors.availableSlots as any)?.[index]?.endTime) && (
                                        <span className="text-xs text-red-500 mt-1">
                                            {(errors.availableSlots as any)[index]?.startTime?.message || (errors.availableSlots as any)[index]?.endTime?.message}
                                        </span>
                                    )}
                                </div>
                            ))}

                            <button  type="button" onClick={() => append({ startTime: "10:00", endTime: "13:00", status: "available" } as any)}
                                className="mt-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition block">
                                + Add More Slot
                            </button>
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button type="submit" disabled={!session?.user} className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg text-base font-semibold shadow-sm transition-all">
                            {!session?.user ? "Loading Session..." : "Save & Enlist Service"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}