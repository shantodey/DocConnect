"use client";

import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { createAuthClient } from "better-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowRoundUp } from "react-icons/io";
import { toast } from "sonner";

interface ISignupInputs {
  name: string;
  email: string;
  password: string;
  role: string;
  gender: string;
}

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMG_UPLOAD_API;
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";
const MAX_FILE_BYTES = 5 * 1024 * 1024;

export default function SignupPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [photoError, setPhotoError] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISignupInputs>({
    defaultValues: { name: "", email: "", password: "", role: "Patient", gender: "" },
  });

  const handleDemoFill = () => {
    setValue("name", "John Doe");
    setValue("email", "demo.patient@example.com");
    setValue("password", "Demo12345!");
    setValue("role", "Patient");
    setValue("gender", "Male");
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setPhotoError("");
    if (!file.type.startsWith("image/")) return setPhotoError("Please choose an image file.");
    if (file.size > MAX_FILE_BYTES) return setPhotoError("Image is over 5MB.");

    setPhotoPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch(`${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`, { method: "POST", body });
      const data = await res.json();
      if (!res.ok || !data?.data?.url) throw new Error(data?.error?.message || "Upload failed.");
      setPhotoUrl(data.data.url);
    } catch (err: any) {
      setPhotoError(err.message || "Upload failed.");
      setPhotoPreview(null);
      setPhotoUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit: SubmitHandler<ISignupInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: photoUrl || undefined,
        role: data.role,
        gender: data.gender,
      } as any);

      if (res?.error) throw new Error(res.error.message);

      toast.success("Account created! Redirecting...");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.message || "Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = () => toast.error("Please fill in all required fields.");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="flex w-full max-w-[900px] items-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/60 md:p-8">
        <div className="relative hidden w-1/2 aspect-square rounded-lg overflow-hidden bg-blue-600 md:block">
          <Image height={400} width={400} src="https://usamrukenya.org/portraitgray.jpg" alt="Design Graphic" className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-lg font-semibold leading-snug">Your care, organized in one place.</p>
            <p className="mt-1 text-sm text-blue-100">Join in seconds and pick up where you left off.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 md:pl-12 py-4">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Create an <span className="text-blue-600">account</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
            <FieldGroup className="gap-4">
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name" className="sr-only">
                  Full Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  aria-invalid={!!errors.name}
                  {...register("name", { required: "Name is required" })}
                  placeholder="Full Name"
                  className="h-11 border-x-0 border-t-0 border-b rounded-none px-0 shadow-none transition-colors duration-200 focus-visible:ring-0 focus-visible:border-blue-600 placeholder:text-slate-400 text-sm aria-invalid:ring-0 aria-invalid:border-red-500"
                />
                {errors.name && <FieldError errors={[{ message: errors.name.message }]} className="animate-in fade-in slide-in-from-top-1 duration-200" />}
              </Field>

              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email" className="sr-only">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  aria-invalid={!!errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  placeholder="Enter your email"
                  className="h-11 border-x-0 border-t-0 border-b rounded-none px-0 shadow-none transition-colors duration-200 focus-visible:ring-0 focus-visible:border-blue-600 placeholder:text-slate-400 text-sm aria-invalid:ring-0 aria-invalid:border-red-500"
                />
                {errors.email && <FieldError errors={[{ message: errors.email.message }]} className="animate-in fade-in slide-in-from-top-1 duration-200" />}
              </Field>

              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password" className="sr-only">
                  Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    aria-invalid={!!errors.password}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })}
                    placeholder="Password"
                    className="h-11 border-x-0 border-t-0 border-b rounded-none pl-0 pr-10 shadow-none transition-colors duration-200 focus-visible:ring-0 focus-visible:border-blue-600 placeholder:text-slate-400 w-full text-sm aria-invalid:ring-0 aria-invalid:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-3 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
                  </button>
                </div>
                {errors.password && <FieldError errors={[{ message: errors.password.message }]} className="animate-in fade-in slide-in-from-top-1 duration-200" />}
              </Field>

              <div className="flex gap-6">
                <Field className="w-1/2 text-left" data-invalid={!!errors.role}>
                  <FieldLabel htmlFor="role" className="text-xs text-slate-500 font-normal">
                    Are you a:
                  </FieldLabel>
                  <select
                    id="role"
                    aria-invalid={!!errors.role}
                    {...register("role", { required: "Please select a role" })}
                    className="w-full bg-transparent h-9 border-b border-slate-200 text-sm transition-colors duration-200 hover:border-blue-300 focus:outline-none focus:border-blue-600 text-slate-700 cursor-pointer aria-invalid:border-red-500"
                  >
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                  {errors.role && <FieldError errors={[{ message: errors.role.message }]} className="animate-in fade-in slide-in-from-top-1 duration-200" />}
                </Field>

                <Field className="w-1/2 text-left" data-invalid={!!errors.gender}>
                  <FieldLabel htmlFor="gender" className="text-xs text-slate-500 font-normal">
                    Gender:
                  </FieldLabel>
                  <select
                    id="gender"
                    aria-invalid={!!errors.gender}
                    {...register("gender", { required: "Please select your gender" })}
                    className="w-full bg-transparent h-9 border-b border-slate-200 text-sm transition-colors duration-200 hover:border-blue-300 focus:outline-none focus:border-blue-600 text-slate-700 cursor-pointer aria-invalid:border-red-500"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <FieldError errors={[{ message: errors.gender.message }]} className="animate-in fade-in slide-in-from-top-1 duration-200" />}
                </Field>
              </div>
            </FieldGroup>

            <Field orientation="horizontal" className="items-center gap-4 py-2">
              <div className={`h-12 w-12 shrink-0 overflow-hidden rounded-full border bg-slate-100 transition-all duration-200 ${photoUrl ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"}`}>
                {photoPreview ? <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" /> : <div className="h-full w-full bg-slate-200" />}
              </div>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" />
              <div className="flex flex-col items-start">
                <Button type="button" variant="secondary" disabled={isUploading} onClick={() => fileInputRef.current?.click()} className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold px-4 py-2 rounded-lg text-xs h-9 transition-colors">
                  {isUploading ? "Uploading..." : "Upload Photo"}
                </Button>
                {photoError && <FieldDescription className="text-red-500 text-[10px] mt-1">{photoError}</FieldDescription>}
              </div>
              <div className="flex flex-wrap items-center gap-2 md:flex-row">
                <Button type="button" variant="outline" onClick={handleDemoFill}>Demo Data <IoIosArrowRoundUp /></Button>
              </div>
            </Field>

            <Button type="submit" disabled={isUploading || isSubmitting} className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm shadow-md shadow-blue-600/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.99] disabled:opacity-60 disabled:active:scale-100 mt-2">
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="w-full max-w-sm mt-3 mx-auto space-y-4">
            <button onClick={() => createAuthClient().signIn.social({ provider: "google" })} className="flex items-center justify-center gap-3 w-full h-11 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm">
              <FcGoogle className="w-5 h-5 shrink-0" />
              <span>Continue with Google</span>
            </button>
            <div className="text-center text-sm text-gray-500">
              Already have an account? <Link href="/login" className="text-[#006BFF] hover:underline font-semibold transition-all">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}