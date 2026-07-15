import React from 'react';
import Link from 'next/link';
import { FaYoutube, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import logo from "../assats/logo.png";
import Image from 'next/image';
interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const quickLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Services', href: '/services' },
];

const actionLinks: FooterLink[] = [
  { label: 'Find a doctor', href: '/doctors' },
  { label: 'Request an Appointment', href: '/doctors' },
  { label: 'Find a Location', href: '/locations' },
];

const supportLinks: FooterLink[] = [
  { label: 'Donate', href: '/donate' },
  { label: 'Contact us', href: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white pt-16 pb-12 px-6 md:px-12 lg:px-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
        
        {/* Brand Profile Column (Takes 2 cols layout space on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Logo Brand Frame */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1FA6B8] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-sm shadow-cyan-100">
              {/* Simplified SVG variant for DocConnect medical icon matching image layout */}
             <Image src={logo} alt="logo" />
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">
              DocConnect
            </span>
          </div>

          {/* Dynamic Copyright notice lines */}
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
            Copyright © {currentYear} developed by Team Shoaib all right reserved.
          </p>

          {/* Clean Rounded Social Links Circle Container */}
          <div className="flex items-center gap-2.5 pt-2">
            {[
              { icon: <FaYoutube />, href: 'https://youtube.', label: 'Youtube' },
              { icon: <FaGithub />, href: 'https://github.com', label: 'Github' },
              { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
              { icon: <FaLinkedinIn />, href: 'https://linkedin.com', label: 'LinkedIn' },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300"
              >
                <span className="text-sm">{social.icon}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Link Set 1: Quick Links */}
        <div className="space-y-5">
          <h4 className="text-xl font-bold text-slate-900 tracking-tight">
            Quick Links
          </h4>
          <ul className="space-y-4">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="text-slate-500 hover:text-slate-900 text-base font-normal transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Link Set 2: User Intents */}
        <div className="space-y-5">
          <h4 className="text-xl font-bold text-slate-900 tracking-tight">
            I want to:
          </h4>
          <ul className="space-y-4">
            {actionLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="text-slate-500 hover:text-slate-900 text-base font-normal transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Link Set 3: Support Contexts */}
        <div className="space-y-5">
          <h4 className="text-xl font-bold text-slate-900 tracking-tight">
            Support
          </h4>
          <ul className="space-y-4">
            {supportLinks.map((link, idx) => (
              <li key={idx}>
                <Link 
                  href={link.href} 
                  className={`text-slate-500 hover:text-slate-900 text-base font-normal transition-all duration-200 ${
                    link.label === 'Contact us' ? 'underline decoration-[#0066FF] text-[#0066FF] font-medium' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}