'use client';

import { Truck, Code, GraduationCap, ShoppingBag, Palette, Briefcase } from "lucide-react";
import Image from "next/image";

export default function EndlessPossibilities() {
  const categories = [
    {
      icon: Truck,
      image: "/images/Deliver_and_logistics.png",
      title: "Delivery & Logistics",
      description: "Hire verified truck drivers, dispatch riders, and couriers for quick, reliable, and trackable deliveries.",
      tags: ["", "", ""]
    },
    {
      icon: Code,
      image: "/images/technology_and_development.png",
      title: "Technology & Development",
      description: "From software engineers to AI specialists, connect with skilled tech talent for projects big or small.",
      tags: ["", "", ""]
    },
    {
      icon: GraduationCap,
      image: "/images/education_and_development.png",
      title: "Education & Training",
      description: "Find qualified teachers, tutors, and interns for academic, professional, or skills-based learning.",
      tags: ["", "", ""]
    },
    {
      icon: ShoppingBag,
      image: "/images/retail_and_service.png",
      title: "Retail & Service Staffing",
      description: "Easily recruit supermarket staff, service workers, or shift-based support to keep operations running smoothly.",
      tags: ["", "", ""]
    },
    {
      icon: Palette,
      image: "/images/creative_and_craft.png",
      title: "Creative & Craft",
      description: "Work with talented dressmakers, designers, and artisans or even graphic designers to bring your creative ideas to life.",
      tags: ["", "", ""]
    },
    {
      icon: Briefcase,
      image: "/images/government_and_professionals.png",
      title: "Government & Professional Services",
      description: "Access credible professionals for civil service roles and public sector recruitment needs.",
      tags: ["", "", ""]
    }
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Endless Possibilities, One Platform
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From quick gigs to specialized roles, Kazi connects you with trusted talent in logistics, tech, education, retail, creative work, and more — all in one platform.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <Image
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={10000}
                  height={10000}
                />
                {/* Icon Badge */}
                <div className="absolute top-50 left-4 w-10 h-10 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  {category.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 sm:px-8 py-1.5 sm:py-2 bg-gray-800 text-white text-xs sm:text-sm font-medium rounded-full block"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}