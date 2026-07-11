'use client';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import doc_four from '../assats/doc-4.png'
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface PatientFAQSectionProps {
  doctorImageSrc?: string; 
  faqList?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    id: 'item-1',
    question: 'What is your medical care?',
    answer: 'We provide comprehensive primary and preventive care services, including routine physicals, wellness exams, chronic disease management, and minor emergency interventions tailored to support your long-term health journey.'
  },
  {
    id: 'item-2',
    question: 'What happens if I need to go to a hospital?',
    answer: 'If your condition requires hospital admission, our physicians coordinate seamlessly with leading local medical centers to manage your transition, secure specialized consultants, and oversee your inpatient care plan.'
  },
  {
    id: 'item-3',
    question: 'Can I visit your medical office?',
    answer: 'Absolutely. We welcome both scheduled appointments and walk-in consultations during standard operational hours. Please bring a valid ID and any relevant insurance credentials.'
  },
  {
    id: 'item-4',
    question: 'Does you provide urgent care?',
    answer: 'Yes, we offer dedicated urgent care services for non-life-threatening emergencies such as acute sprains, lacerations requiring sutures, sudden fevers, and minor allergic reactions.'
  }
];

export default function PatientFAQSection({

  faqList = defaultFAQs
}: PatientFAQSectionProps) {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT COLUMN: Gradient Card with Transparent APNG */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[420px] aspect-[4/5] bg-gradient-to-t from-[#ff8300] via-[#ffaa3a] to-white rounded-[40px] overflow-visible shadow-lg border border-orange-50">
            <div className="absolute inset-x-0 bottom-0 top-[-60px] flex items-end justify-center">
              <Image src={doc_four}
                alt="Doctor Standing"
                width={400}
                height={550}
                priority
                className="object-contain object-bottom w-[95%] h-[110%]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Official Shadcn UI Accordion */}
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Most questions by our beloved patients
          </h2>

          {/* Shadcn Accordion Root */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqList.map((faq) => (
              <AccordionItem   key={faq.id}   value={faq.id}
                className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:border-orange-200 px-6 data-[state=open]:border-orange-300"
              >
                <AccordionTrigger className="text-left font-semibold text-lg lg:text-xl text-slate-800 hover:text-slate-900 hover:no-underline py-5 focus-visible:ring-0">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-5 pt-2 border-t border-slate-100 mt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}