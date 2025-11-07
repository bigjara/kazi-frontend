'use client';

import { Target, Shield, Clock, Globe } from "lucide-react";

export default function PowerfulFeatures() {
  const features = [
    {
      icon: Target,
      title: "AI-Powered Matching",
      description: "Our advanced algorithm analyzes skills, requirements, and preferences to create perfect matches between creators and executors.",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
      textColor: "text-blue-600"
    },
    {
      icon: Shield,
      title: "Verified Security",
      description: "Multi-layer verification system including ID checks, skill assessments, and background verification for maximum trust.",
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
      textColor: "text-green-600"
    },
    {
      icon: Clock,
      title: "Lightning Fast",
      description: "Get matched and start collaborating within minutes. No lengthy application or waiting periods required.",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-500",
      textColor: "text-purple-600"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access talent and opportunities from around the world with seamless cross-border payment solutions.",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-500",
      textColor: "text-orange-600"
    }
  ];

  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Powerful Features
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of task management with cutting-edge technology and unmatched security.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all hover:shadow-lg hover:-translate-y-1 duration-300`}
            >
              {/* Icon */}
              <div className={`${feature.iconBg} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 sm:mb-8`}>
                <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className={`text-xl sm:text-2xl font-bold ${feature.textColor} mb-3 sm:mb-4`}>
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}