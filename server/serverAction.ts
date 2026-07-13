"use server"

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
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