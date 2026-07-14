"use client";

import { useForm, Controller } from "react-hook-form"; // ponytail: native integration with custom select
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { createAppointment } from "../../../../../server/serverAction";
import { toast } from "sonner";

interface BookAppointmentDialogProps {
    doctorName: string;
    specialty: string;
    fee: number;
    availableSlots: Array<{ time: string; status: string }>;
}

interface FormValues {
    date: string;
    timeSlot: string;
}

export function BookAppointment({ doctorName, specialty, fee, availableSlots }: BookAppointmentDialogProps) {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const { register, handleSubmit, control, formState: { isSubmitting } } = useForm<FormValues>();

   const onSubmit = async (data: FormValues) => {
    if (!user) return toast.error("Please login to book an appointment");

    const bookingData = {
        userName: user.name,
        userEmail: user.email,
        doctorName,
        specialty,
        fee,
        date: data.date,
        timeSlot: data.timeSlot,
    };

    const bookingPromise = async () => {
        const apiCall = createAppointment(bookingData);
        const delay = new Promise((resolve) => setTimeout(resolve, 2000));
        const [result] = await Promise.all([apiCall, delay]);

        if (!result.success) {
            throw new Error(result.message || "Something went wrong.");
        }
        return result;
    };

    toast.promise(bookingPromise(), {
        loading: "Booking your appointment...",
        success: "Appointment booked successfully!",
        error: (err: any) => err.message || "Failed to book appointment",
    });
};

    return (
        <Dialog>
            <DialogTrigger render={<Button disabled={isPending} className="w-full bg-[#006BFF] hover:bg-[#0056D4] text-white h-12 rounded-xl font-bold">
                {isPending ? "Loading..." : "Book Appointment"}
            </Button>} />

            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle>Book an Appointment</DialogTitle>
                    <DialogDescription>Booking with <strong>{doctorName}</strong></DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup className="space-y-4">
                        <Field>
                            <Label>Your Name</Label>
                            <Input defaultValue={user?.name || ""} disabled className="bg-gray-100" />
                        </Field>

                        <Field>
                            <Label>Email Address</Label>
                            <Input defaultValue={user?.email || ""} disabled className="bg-gray-100" />
                        </Field>

                        <Field>
                            <Label htmlFor="date">Preferred Date</Label>
                            <Input id="date" type="date" required min={new Date().toISOString().split("T")[0]}  {...register("date", { required: true })} />
                        </Field>

                        <Field>
                            <Label htmlFor="timeSlot">Available Slots</Label>
                            <Controller control={control} name="timeSlot" rules={{ required: true }} render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value || ""} required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a time slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {availableSlots
                                                .filter((slot) => slot.status === "available")
                                                .map((slot, idx) => (
                                                    <SelectItem key={idx} value={slot.time}>{slot.time}</SelectItem>
                                                ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="gap-2">
                        <DialogClose render={<Button type="button" variant="outline">Cancel</Button>} />
                        <Button type="submit" disabled={!user || isSubmitting} className="bg-[#006BFF] hover:bg-[#0056D4] text-white">
                            {isSubmitting ? "Booking..." : user ? "Confirm Booking" : "Login Required"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}


