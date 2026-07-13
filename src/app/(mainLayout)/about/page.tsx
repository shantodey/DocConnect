import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
    return (
        <div className="w-full bg-[#f8fafc] text-slate-900 ">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 py-16 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950">
                    Your Health, Connected Instantly.
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    DocConnect bridges the gap between patient care and modern technology. We streamline appointments, scheduling, and medical workflows.
                </p>
            </section>
            <section className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-950">Our Mission</h2>
                    <p className="text-slate-600 leading-relaxed text-sm">
                        We empower individuals by providing immediate access to certified practitioners. By removing the administrative friction of healthcare administration, we allow patients to prioritize actual recovery over traditional hospital queue management systems.
                    </p>
                    <div className="pt-2">

                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 h-11 rounded-lg" render={<Link href={'/doctors'} ></Link>}>
                            Find a Doctor
                        </Button>
                    </div>
                </div>
                <div className="bg-white p-2 border border-slate-200 rounded-2xl shadow-sm">
                    <Image src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" alt="Medical team collaboration" width={800} height={288}
                        className="w-full h-72 object-cover rounded-xl" />
                </div>
            </section>


        </div>
    );
}