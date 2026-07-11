import React from 'react';
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "@/components/ui/button";

// টাইপ ডিফিনিশন
interface Service {
  id: string;
  title: string;
  description: string;
  color: string;
}

// ডেটা সোর্স
const services: Service[] = [
  { 
    id: "1", 
    title: "Cancer Care", 
    description: "World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.", 
    color: "bg-yellow-100" 
  },
  { 
    id: "2", 
    title: "Labor & Delivery", 
    description: "World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.", 
    color: "bg-purple-100" 
  },
  { 
    id: "3", 
    title: "Heart & Vascular", 
    description: "World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.", 
    color: "bg-teal-100" 
  },
  { 
    id: "4", 
    title: "Mental Health", 
    description: "World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.", 
    color: "bg-cyan-100" 
  },
  { 
    id: "5", 
    title: "Neurology", 
    description: "World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.", 
    color: "bg-amber-100" 
  },
  { 
    id: "6", 
    title: "Burn Treatment", 
    description: "World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.", 
    color: "bg-purple-200" 
  },
];

export default function ServicesGrid(): JSX.Element {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* সেকশন হেডার */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our medical services</h2>
          <p className="text-gray-500 leading-relaxed">
            World-class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>

        {/* গ্রিড লেআউট */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="group border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl p-4"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex justify-between items-center pt-4">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  >
                    <ArrowRight size={20} />
                  </Button>
                  <span className={`px-4 py-2 rounded-lg font-bold text-lg ${service.color}`}>
                    {service.id}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}