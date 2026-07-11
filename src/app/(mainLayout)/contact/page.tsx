import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
            Got a technical issue? Want to send feedback about a beta feature? Let us know
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Your Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="w-full border-blue-200 focus-visible:ring-blue-500 h-11"
            />
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
              Subject
            </Label>
            <Input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you"
              className="w-full border-blue-200 focus-visible:ring-blue-500 h-11"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
              Your Message
            </Label>
            <Textarea
              id="message"
              placeholder="Leave a comment..."
              rows={6}
              className="w-full border-blue-200 focus-visible:ring-blue-500 resize-none min-h-[150px]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 h-auto rounded-md shadow-sm transition-colors">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}