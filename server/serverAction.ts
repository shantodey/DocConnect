"use server"

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
}

export async function getDoctors(search?: string) {
  try {
    const url = search ? `${process.env.SERVER_URL}/doctors?search=${encodeURIComponent(search)}` : `${process.env.SERVER_URL}/doctors`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error in getDoctors:", error);
    return [];
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