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