'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16">
          
          {/* Left Side - Brand Section */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              B - J
            </h3>
            <p className="text-base sm:text-lg text-gray-900 font-medium mb-6 sm:mb-8 leading-relaxed">
              Connecting People to Possibilities.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link 
                href="#" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 group"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Right Side - Three Columns in One Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10">
            
            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <Link href="/" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Users */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                For Users
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <Link href="/find-task" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
                    Find a Task
                  </Link>
                </li>
                <li>
                  <Link href="/hire-talent" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
                    Hire Talent
                  </Link>
                </li>
                <li>
                  <Link href="/create-account" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors">
                    Support Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                Contact Us
              </h4>
              <ul className="space-y-4 sm:space-y-5">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                  <div>
                    <Link href="mailto:hello@bigjara.com" className="text-sm sm:text-base text-gray-900 hover:underline block">
                      hello@bigjara.com
                    </Link>
                    <span className="text-xs sm:text-sm text-gray-500">General Inquiries</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                  <div>
                    <Link href="tel:+2348100000" className="text-sm sm:text-base text-gray-900 hover:underline block">
                      +234 8100000
                    </Link>
                    <span className="text-xs sm:text-sm text-gray-500">Support Hotline</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm sm:text-base text-gray-900 block">Lagos, Nigeria</span>
                    <span className="text-xs sm:text-sm text-gray-500">Headquarters</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-10 sm:mt-12 lg:mt-16 pt-8 sm:pt-10 border-t border-gray-200">
          <div className="flex flex-end border-amber-700  sm:flex-row items-end sm:items-center gap-120 sm:gap-6 lg:gap-10">
            <label htmlFor="email" className="text-base sm:text-lg font-semibold text-gray-900 whitespace-nowrap">
              Subscribe
            </label>
            <div className="w-full sm:flex-1 max-w-md">
              <input
                type="email"
                id="email"
                placeholder="youremail@gmail.com"
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Separator Line */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © 2021 All Rights Reserved
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
              <Link href="/privacy" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Use
              </Link>
              <Link href="/cookies" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}