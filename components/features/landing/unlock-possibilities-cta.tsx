'use client';

import { Rocket, Trophy, Shield } from "lucide-react";
import Image from "next/image";

export default function UnlockPossibilitiesCTA() {
  const features = [
    {
      icon: Rocket,
      title: "Launch Fast",
      description: "Get started in minutes"
    },
    {
      icon: Trophy,
      title: "Achieve More",
      description: "Premium results every time"
    },
    {
      icon: Shield,
      title: "Stay Safe",
      description: "Verified users & secure payment"
    }
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image Container - CRITICAL: Must have explicit height */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/backgroud_image.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to Unlock New Possibilities?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kazi brings people together across all industries to hire, work, and grow with trust. Start today and unlock new possibilities.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-14 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                {/* Icon Circle */}
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="inline-flex items-center justify-center px-8 sm:px-10 lg:px-12 py-3.5 sm:py-4 lg:py-5 bg-gray-900 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}