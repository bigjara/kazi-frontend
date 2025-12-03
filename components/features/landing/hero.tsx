'use client';

import { ArrowRight } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        {/* Mobile: Image first, Desktop: Grid layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          
          {/* Image Section - Shows first on mobile, second on desktop */}
          <div className="relative order-2 lg:order-2 mb-8 lg:mb-0 lg:mt-0 -mt-16 sm:-mt-20 lg:-mt-30">
            {/* Main Image Card with Glassmorphism */}
            <div className="relative rounded-3xl sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* Image */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src="/images/Hero_Image.png" 
                  alt="Team collaboration with hands together"
                  className="absolute inset-0 w-full h-full object-cover"
                  width={500}
                  height={500}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 rounded-2xl sm:rounded-3xl bg-white/30 backdrop-blur-xl border border-white/50 p-4 sm:p-6 shadow-xl">
                {/* Avatar Group */}
                <div className="flex items-center -space-x-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-linear-to-br from-blue-400 to-blue-600 overflow-hidden">
                    <Image src="/images/Ellipse_95.png" alt="User" className="w-full h-full object-cover" width={100} height={100} />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-purple-600 overflow-hidden">
                    <Image src="/images/Ellipse_96.png" alt="User" className="w-full h-full object-cover" width={100} height={100} />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-pink-600 overflow-hidden">
                    <Image src="/images/Ellipse_97.png" alt="User" className="w-full h-full object-cover" width={100} height={100} />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden">
                    <Image src="/images/Ellipse_98.png" alt="User" className="w-full h-full object-cover" width={100} height={100} />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">1k+</span>
                  <span className="text-sm sm:text-base text-white/90 font-medium">Satisfied Clients</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full blur-3xl opacity-50 -z-10"></div>
          </div>

          {/* Text Content - Shows second on mobile, first on desktop */}
          <div className="order-1 lg:order-1 space-y-6 sm:space-y-8 lg:space-y-10 pt-4 sm:pt-8 lg:pt-16">
            {/* Main Heading */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                KAZI: Connecting
              </h1>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                People to Possibilities
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
              Get the right people for the right tasks. Kazi makes hiring effortless fast connections, simple steps, and reliable outcomes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href='/auth/register' className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href='' className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/50 backdrop-blur-md border border-gray-200 text-gray-900 font-medium hover:bg-white/70 transition-all shadow-sm">
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}