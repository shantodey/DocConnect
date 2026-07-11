"use client";

import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ISignupInputs {
  name: string;
  email: string;
  password: string;
  role: string;
  gender: string;
}

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMG_UPLOAD_API;
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

export default function SignupPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  // ইমেজ স্টেট
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [photoError, setPhotoError] = useState<string>("");

  // React Hook Form
  const { register, handleSubmit } = useForm<ISignupInputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "Patient",
      gender: "",
    }
  });

  // ImgBB Upload
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setPhotoError("");

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setPhotoError("That image is over 5MB. Choose a smaller one.");
      return;
    }

    setPhotoPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      if (!IMGBB_API_KEY) {
        throw new Error("Image upload isn't configured (missing NEXT_PUBLIC_IMG_UPLOAD_API).");
      }

      const body = new FormData();
      body.append("image", file);

      const res = await fetch(`${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body,
      });
      const data = await res.json();

      if (!res.ok || !data?.data?.url) {
        throw new Error(data?.error?.message || "Upload failed. Try again.");
      }

      setPhotoUrl(data.data.url);
    } catch (err: any) {
      setPhotoError(err.message || "Upload failed. Try again.");
      setPhotoPreview(null);
      setPhotoUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit: SubmitHandler<ISignupInputs> = (data) => {
    const payload = {
      ...data,
      image: photoUrl,
      callbackURL: "/",
    };
    console.log("Submitting Payload:", payload);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

      <div className="flex w-full max-w-[900px] items-center overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-sm md:p-8">
        <div className="hidden w-1/2 aspect-square bg-blue-600 rounded-lg md:block">
          <img
            src="https://walkin-clinic.co.uk/wp-content/uploads/2025/01/Urgent-Doctor-Appointment-1024x560.png"
            alt="Design Graphic"
            className="h-full w-full object-cover opacity-90 rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 md:pl-12 py-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Create an <span className="text-blue-600">account</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Full Name */}
            <div>
              <Input
                type="text"
                {...register("name")}
                placeholder="Full Name"
                className="h-11 border-x-0 border-t-0 border-b rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 placeholder:text-slate-400 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <Input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="h-11 border-x-0 border-t-0 border-b rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 placeholder:text-slate-400 text-sm"
              />
            </div>

            {/* Password Field with functional dynamic Eye Toggle Button */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
                className="h-11 border-x-0 border-t-0 border-b rounded-none pl-0 pr-10 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 placeholder:text-slate-400 w-full text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 bottom-3 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
              </button>
            </div>

            {/* Dropdowns (Flex layout as per second image) */}
            <div className="flex gap-6 pt-2">
              <div className="w-1/2 text-left">
                <label className="text-xs text-slate-500 block mb-1">Are you a:</label>
                <select
                  {...register("role")}
                  className="w-full bg-transparent h-9 border-b border-slate-200 text-sm focus:outline-none focus:border-blue-600 text-slate-700 cursor-pointer"
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </div>

              <div className="w-1/2 text-left">
                <label className="text-xs text-slate-500 block mb-1">Gender:</label>
                <select
                  {...register("gender")}
                  className="w-full bg-transparent h-9 border-b border-slate-200 text-sm focus:outline-none focus:border-blue-600 text-slate-700 cursor-pointer"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Image Upload Row (Avatar + Button) */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-slate-200" />
                )}
              </div>
              
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                className="hidden"
              />
              
              <div className="flex flex-col items-start">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold px-4 py-2 rounded-lg text-xs h-9 transition-colors"
                >
                  {isUploading ? "Uploading..." : "Upload Photo"}
                </Button>
                {photoError && <p className="text-red-500 text-[10px] mt-1">{photoError}</p>}
              </div>
            </div>

            {/* Sign Up Submit Button */}
            <Button
              type="submit"
              disabled={isUploading}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors mt-2"
            >
              Sign Up
            </Button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}