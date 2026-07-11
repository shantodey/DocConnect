"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-[450px] rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
        
        <div className="mb-8 text-left">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Hello!<span className="text-blue-600">Welcome</span> Back 🎉
          </h1>
        </div>

        <div className="space-y-5">
          <div>
            <Input
              type="email"
              placeholder="naiffarooqui131415@gmail.com"
              className="h-11 border-x-0 border-t-0 border-b rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 placeholder:text-slate-400"
            />
          </div>

          {/* Password Input with functional Toggle Button */}
          <div className="relative">
            <Input
              // স্টেটের ওপর ভিত্তি করে টাইপ ডাইনামিকালি চেঞ্জ হবে
              type={showPassword ? "text" : "password"}
              placeholder="************"
              className="h-11 border-x-0 border-t-0 border-b rounded-none pl-0 pr-10 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 placeholder:text-slate-400 w-full"
            />
            
            {/* একক বাটন যা ক্লিক করলে স্টেট টগল করবে এবং আইকন ও টেক্সট টাইপ বদলে দেবে */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-3 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="button"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-base transition-colors"
          >
            Login
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Register
          </a>
        </div>
        
      </div>
    </div>
  );
}