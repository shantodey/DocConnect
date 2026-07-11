"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";


interface IFormInputs {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IFormInputs>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log("Login Payload:", data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-[450px] rounded-xl border border-slate-100 bg-white p-8 shadow-sm">

                <div className="mb-8 text-left">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900"> Hello!<span className="text-blue-600">Welcome</span> Back 🎉 </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-1">
                        <Input type="email" {...register("email", { required: " Email is required" })} placeholder="naiffarooqui131415@gmail.com"
                            className="h-11 border-x-0 border-t-0 border-b rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 placeholder:text-slate-400" />
                        {errors.email && (
                            <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} {...register("password", { required: " Password is required" })} placeholder="************"
                                className="h-11 border-x-0 border-t-0 border-b rounded-none pl-0 pr-10 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 placeholder:text-slate-400 w-full"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 bottom-3 text-slate-400 hover:text-slate-600 transition-colors">
                                {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
                            </button>
                        </div>
                        {errors.password && (<p className="text-xs text-red-500 font-medium">{errors.password.message}</p>)}
                    </div>

                    <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-base transition-colors pt-1">
                        Login
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-600">  Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium"> Register</Link>
                </div>

            </div>
        </div>
    );
}