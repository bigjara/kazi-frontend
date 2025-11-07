'use client';
import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-6 shadow-sm border border-gray-100">
            <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
              Guide • How it works
            </span>
          </div>
          
          {/* Title and Description Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left: Title */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Seamless Task
              </h2>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-300 leading-tight">
                Hiring Process
              </p>
            </div>
            
            {/* Right: Description */}
            <div className="lg:pt-2">
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed">
                <span className="inline lg:block">Our platform streamlines the hiring of assistants of any task, also for users to connect and get any task,</span> ensuring a smooth, efficient, and secure process. Discover how easy it is to get things done.
              </p>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-12 sm:mb-16 lg:mb-20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <div className="w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] relative">
            <Image
              src="/images/How_It_Works_Image.png" 
              alt="Team collaboration meeting"
              className="absolute inset-0 w-full h-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* Feature 1 */}
          <div className="relative mr-10">
            {/* Number Circle */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
              <span className="text-white text-xl sm:text-2xl font-bold">01</span>
            </div>
            
            {/* Dotted Line - Hidden on mobile, shown on larger screens */}
            <div className="hidden sm:block absolute top-7 sm:left-20  w-[50%] h-0.5 border-t-2 border-dotted border-gray-300" 
                 style={{width: 'calc(100% - 2rem)'}}></div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Create Your Profile
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Set up your professional profile as either a Task Creator or Task Executor. Complete your information with basic details to build trust.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="relative">
            {/* Number Circle */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
              <span className="text-white text-xl sm:text-2xl font-bold">02</span>
            </div>
            
            {/* Dotted Line - Hidden on mobile and last item */}
            <div className="hidden lg:block absolute top-7 left-16 sm:left-20 w-full h-0.5 border-t-2 border-dotted border-gray-300" 
                 style={{width: 'calc(100% - 4rem)'}}></div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Smart Matching
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Our AI algorithm analyzes your skills, requirements, and preferences to find perfect matches and opportunities for tailored opportunities.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="relative">
            {/* Number Circle */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
              <span className="text-white text-xl sm:text-2xl font-bold">03</span>
            </div>
            {/* Dotted Line - Hidden on mobile and last item */}
            <div className="hidden lg:block absolute top-7 left-16 sm:left-20 w-full h-0.5 border-t-2 border-dotted border-gray-300" 
                 style={{width: 'calc(100% - 4rem)'}}></div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Secure Collaboration
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Work together through our secure platform with built-in communication tools, milestone tracking and protection services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}