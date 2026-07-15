"use client";

import { BadgeCheckIcon, BellIcon, CreditCardIcon, LogOutIcon, } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";
import logo from "../assats/logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { FiUser } from "react-icons/fi";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";


const links = [
  { label: "Find a Doctor", href: "/doctors" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const { image, name, role }: any = user || { image: undefined, name: "", role: '' };
  const logout = async () => {
    await authClient.signOut();
  }
  return (
    <header className=" bg-gradient-to-r from-[#CEF1F4] via-white to-[#FFF5DF]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="logo" />
          <span className="text-2xl font-semibold">DocConnect</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-gray-600 transition hover:text-sky-600">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {role === "Doctor" ? (
                <HoverCard>
                  <HoverCardTrigger delay={10}  closeDelay={100} render={
                      <Button nativeButton={false} variant="ghost" render={<Link href="/addservice">Add Services</Link>} />
                    }
                  />
                  <HoverCardContent className="flex w-64 flex-col gap-0.5 bg-white">
                    <div className="font-semibold">Become a listed doctor</div>
                    <div>Add your specialization, fees, and available slots so patients can book you directly.</div>
                    <div className="mt-1 text-xs text-muted-foreground">Takes about 2 minutes</div>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <></>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger render={
                  <button className="rounded-full border-2">
                    <Avatar>
                      <AvatarImage src={image || "/avatar.jpg"} alt={name} />
                      <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>
                  </button>
                } />
                <DropdownMenuContent align="end" className={'bg-white'}>
                  <DropdownMenuGroup>
                    <DropdownMenuItem render={<Link href="/profile"><FiUser /> Account </Link>} />
                    <DropdownMenuItem render={<Link href={'/appoint'}><BellIcon /> My Appoint </Link>} />
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOutIcon />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button nativeButton={false} variant="ghost" render={<Link href="/login">Login</Link>} />
              <Button nativeButton={false} render={<Link href="/register">Register</Link>} />
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden bg-white">
          <Sheet>
            <SheetTrigger render={
              <button>
                <HiOutlineMenu className="h-6 w-6" />
              </button>
            } />
            <SheetContent side="right" className={'bg-white'}>
              <div className="mt-8 flex flex-col gap-6 px-4">
                {links.map((item) => (
                  <Link key={item.label} href={item.href} className="text-lg">
                    {item.label}
                  </Link>
                ))}

                <div className="mt-4 border-t pt-4">
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <Link href="/profile" className="text-lg">Profile</Link>
                      <Link href="/appoint" className="text-lg">My Appoint</Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button nativeButton={false} render={<Link href="/login">Login</Link>} />
                      <Button nativeButton={false} variant="outline" render={<Link href="/register">Register</Link>} />
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

