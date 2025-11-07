
'use client';

export default function StartConversation() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 leading-tight px-4">
          Let&apos;s start the conversation
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
          Whether you&apos;re here to hire, work, or explore opportunities, we&apos;re just a message away.
        </p>

        {/* CTA Button */}
        <button className="inline-flex items-center justify-center px-8 sm:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 bg-white text-gray-900 text-base sm:text-lg font-medium rounded-full border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md">
          Contact Us
        </button>
      </div>
    </section>
  );
}