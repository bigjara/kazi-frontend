"use client";

import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react"; // or Heroicons

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-4 sm:top-6 lg:top-8 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[85%] lg:w-4/5 max-w-7xl z-50 m">
      <div className="rounded-2xl sm:rounded-3xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-gray-900">B - J</div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Features
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              How it Works
            </a>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <button className="flex items-center gap-2 px-5 lg:px-6 py-1 lg:py-2 rounded-xl  border-2 border-white/100 text-gray-900 font-medium hover:bg-white/70 transition-all shadow-sm">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/30 space-y-3">
            <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium py-2">
              Home
            </a>
            <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium py-2">
              Features
            </a>
            <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium py-2">
              How it Works
            </a>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white/60 text-gray-900 font-medium mt-2">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}