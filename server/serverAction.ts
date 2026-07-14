"use server"

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
}

export async function getRandomDoctors(limit: number = 7) {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/doctors/random?limit=${limit}`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching random doctors:", error);
    return [];
  }
}

export async function getDoctors(search?: string, page: number = 1, sort?: string, specialty?: string) {
  try {
    const params = new URLSearchParams({ page: page.toString(), limit: "8" });
    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
    if (specialty) params.append("specialty", specialty);

    const response = await fetch(`${process.env.SERVER_URL}/doctors?${params.toString()}`);
    return await response.json();
  } catch (error) {
    console.error("Error in getDoctors:", error);
    return { doctors: [], totalPages: 1 };
  }
}


export async function getDoctorById(id: string) {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/doctors/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`Error in getDoctorById (${id}):`, error);
    return null;
  }
}



export async function updateProfile(id: string, name: string, email: string, image?: string | null) {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/user/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, email, image }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return { success: false, message: "Failed to update profile" };
  }
}

export async function createAppointment(bookingData: {
  doctorId: string | { $oid: string } | undefined;
  userName: string;
  userEmail: string;
  doctorName: string;
  doctorImg: string;
  specialty: string;
  fee: number;
  date: string;
  timeSlot: string;
}) {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to book" };
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, message: "Server connection failed" };
  }
}




export async function getMyAppointments(userid: string) {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/appointments/${userid}`, { cache: "no-store" });
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}



export async function cancelAppointment(id: string) {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/appointments/${id}`, { method: "DELETE" });
    return response.ok;
  } catch (error) {
    console.error("Error Canceling your appointments:", error);
    return [];
  }

}