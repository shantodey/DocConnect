"use client";

import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";
import logo from "../assats/logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const links = [
  { label: "Find a Doctor", href: "/doctors" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const user = null;

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="logo" />
          <span className="text-2xl font-semibold">DocConnect</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((item) => (
            <Link key={item.label} href={item.href}  className="text-sm font-medium text-gray-600 transition hover:text-sky-600">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" render={<Link href="/login">Login</Link>} />

              <Button render={<Link href="/register">Register</Link>} />
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <Sheet>
              <SheetTrigger render={
                <Button variant="ghost" size="icon">
                  <HiOutlineMenu className="h-6 w-6" />
                </Button>
              } />
              <SheetContent side="right">
                ...
              </SheetContent>
            </Sheet>

            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-6">
                {links.map((item) => (
                  <Link key={item.label} href={item.href} className="text-lg">
                    {item.label}
                  </Link>
                ))}

                <div className="mt-4 border-t pt-4">
                  {user ? (
                    <>
                      <Link href="/profile">Profile</Link>
                      <br />
                      <Link href="/dashboard">Dashboard</Link>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button render={<Link href="/login">Login</Link>} />
                      <Button variant="outline" render={<Link href="/register">Register</Link>} />
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}