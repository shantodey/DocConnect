"use client";

import { FiSend } from "react-icons/fi";
import { LuMessageSquare } from "react-icons/lu";
import { toast } from "sonner"
import { Button } from "@/components/ui/button"


export function FeedbackTab() {
  return (
    <div className="space-y-6 mt-6">
      {/* Input Box */}
      <div className="bg-white border border-amber-200/60 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-2 text-[#855D2C] text-sm font-semibold mb-3">
          <LuMessageSquare /> <span>Have a question about this dish?</span>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Question submitted!"); (e.target as HTMLFormElement).reset(); }} className="relative flex items-center">
          <input type="text" required placeholder="Ask about ingredients..." className="w-full bg-transparent border border-slate-200 rounded-xl pl-4 pr-14 h-12 text-sm outline-none focus:border-[#C49A6C]" />
          
          <button type="submit" className="absolute right-1.5 bg-[#D4A373] text-white p-2.5 rounded-lg"><FiSend /></button>
        </form>
      </div>

      
    </div>
  );
}