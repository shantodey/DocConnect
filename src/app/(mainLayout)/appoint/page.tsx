"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getMyAppointments } from "../../../../server/serverAction";

const page = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;
        getMyAppointments(user.id).then(setAppointments);
    }, [user]);

    if (isPending) return <div>Loading...</div>;
    console.log(appointments);
    
    return (
        <section>
            {appointments.map((a: any) => (
                <div key={a._id}>{a.doctorName} — {a.date} {a.timeSlot}</div>
            ))}
        </section>
    );
};

export default page;